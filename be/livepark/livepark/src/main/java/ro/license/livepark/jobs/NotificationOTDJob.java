package ro.license.livepark.jobs;


import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ro.license.livepark.email.NotificationEmailService;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.driver.DriverService;
import ro.license.livepark.service.notification.NotificationService;
import ro.license.livepark.service.user.UserService;

import java.util.Map;

@EnableScheduling
@Component
@RequiredArgsConstructor
public class NotificationOTDJob {

    private final NotificationLocalCacheJob notificationLocalCacheJob;
    private final CarService carService;
    private final DriverService driverService;
    private final UserService userService;
    private final NotificationEmailService emailService;
    private final NotificationService notificationService;

    @Scheduled(fixedDelay = 60000) // Run every 60 seconds
    public void runJob() {
        System.out.println("Scheduled NotificationOTD job is running...");

        if (notificationLocalCacheJob == null) {
            System.err.println("NotificationLocalCacheJob is null");
            return;
        }

        Map<String, Map<String, Notification>> localCache = notificationLocalCacheJob.getLocalCache();
        if (localCache == null) {
            System.err.println("Local cache is null");
            return;
        }

        if (localCache.isEmpty())
            return;

        for (Map.Entry<String, Map<String, Notification>> carNotifications : localCache.entrySet()) {
            String licensePlate = carNotifications.getKey();
            Map<String, Notification> notifications = carNotifications.getValue();

            if (notifications.isEmpty())
                continue;

            CarDTO carDTO = carService.findByPlate(licensePlate);
            if (carDTO == null)
                throw new IllegalStateException("Unable to find car with plate " + licensePlate);

            if (carDTO.ownerId() == null)
                throw new IllegalStateException("Car with plate " + licensePlate + " has no owner");

            DriverDTO driverDTO = driverService.findDriverDTOByUserId(carDTO.ownerId());
            if (driverDTO == null)
                throw new IllegalStateException("Unable to find driver with user id " + carDTO.ownerId());

            UserDTO userInfo = userService.getUserInfo(driverDTO.driverId());
            if (userInfo == null)
                throw new IllegalStateException("Unable to find user with id " + driverDTO.driverId());

            if (userInfo.email() == null)
                throw new IllegalStateException("User with id " + driverDTO.driverId() + " has no email");

            String email = userInfo.email();
            for (Map.Entry<String, Notification> notificationType : notifications.entrySet()) {
                String keyword = notificationType.getKey();
                Notification notification = notificationType.getValue();

                if (notification == null)
                    continue;

                notificationService.save(notification);

                try {
                    emailService.send(email, String.format("LivePark - %s is expiring!", keyword) + notification.getVerbosity().getText(),
                            "Hi " +
                                    String.format("Your %s is expiring in %d days!", keyword, NotificationLocalCacheJob.numberOfDaysLeft(notification.getCreatedAt())));
                 } catch (Exception e) {
                    System.err.println("Unable to send email to " + email);
                    e.printStackTrace();
                }
            }
        }
    }

}
