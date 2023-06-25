package ro.license.livepark.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.driver.Driver;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.notification.Verbosity;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.driver.DriverService;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableScheduling
@Component
public class NotificationLocalCacheJob {

    private final Logger logger = LoggerFactory.getLogger(NotificationLocalCacheJob.class);
    private final CarService carService;
    private final DriverService driverService;

    public NotificationLocalCacheJob(CarService carService, DriverService driverService) {
        this.carService = carService;
        this.driverService = driverService;
    }

    private final Map<String, Map<String, Notification>> localCache = new HashMap<>();

    @Scheduled(fixedDelay = 200000000) // Run every 20 seconds
    public void runJob() {
        try {
            logger.info("Scheduled NotificationLocalCache job is running...");

            List<CarDTO> cars = carService.findAll();

            for (CarDTO car : cars) {

                Map<String, Date> dateExpiration = new HashMap<>();
                logger.info(car.plate());

                if (checkDate(car.rcaExpirationDate()))
                    dateExpiration.put("RCA", car.rcaExpirationDate());

                if (checkDate(car.itpExpirationDate()))
                    dateExpiration.put("ITP", car.itpExpirationDate());

                if (checkDate(car.rovinietaExpirationDate()))
                    dateExpiration.put("Rovinieta", car.rovinietaExpirationDate());

                if (checkDate(car.cascoExpirationDate()))
                    dateExpiration.put("Casco", car.cascoExpirationDate());

                if (checkDate(car.fireExtinguisherExpirationDate()))
                    dateExpiration.put("Fire extinguisher", car.fireExtinguisherExpirationDate());

                if (checkDate(car.firstAidKitExpirationDate()))
                    dateExpiration.put("First aid kit", car.firstAidKitExpirationDate());

                if (dateExpiration.isEmpty()) {
                    localCache.remove(car.plate());
                    continue;
                }

                updateLocalCache(car, dateExpiration);
            }

        } catch (Exception e) {
            logger.error("Error in NotificationLocalCache job: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void updateLocalCache(CarDTO car, Map<String, Date> dateExpiration) {
        Map<String, Notification> notifications;

        if (localCache.containsKey(car.plate())) {
            notifications = localCache.get(car.plate());
            for (Map.Entry<String, Date> entry : dateExpiration.entrySet()) {
                if (notifications.containsKey(entry.getKey()))
                    continue;

                Notification notification = createNotification(car, entry);
                notifications.put(entry.getKey(), notification);
            }

            return;
        }

        notifications = new HashMap<>();
        for (Map.Entry<String, Date> entry : dateExpiration.entrySet())
            notifications.put(entry.getKey(), createNotification(car, entry));

        localCache.put(car.plate(), notifications);
    }

    private Notification createNotification(CarDTO car, Map.Entry<String, Date> typeAndDate) {
        Driver driver = driverService.findDriverByUserId(car.ownerId());
        if (driver == null)
            throw new IllegalStateException("Driver not found");

        return Notification
                .builder()
                .driver(driver)
                .title(typeAndDate.getKey())
                .message(String.format("Your %s expires on %s", typeAndDate.getKey(), typeAndDate.getValue()))
                .createdAt(new java.sql.Date(typeAndDate.getValue().getTime()))
                .isClosed(false)
                .verbosity(createVerbosity(typeAndDate.getValue()))
                .build();
    }

    private Verbosity createVerbosity(Date date) {
        long daysLeft = numberOfDaysLeft(date);

        if (20 <= daysLeft && daysLeft <= 30)
            return Verbosity.LOW;

        if (10 <= daysLeft && daysLeft <= 20)
            return Verbosity.MEDIUM;

        if (0 <= daysLeft && daysLeft <= 10)
            return Verbosity.HIGH;

        throw new IllegalStateException("Invalid date");
    }


    private boolean checkDate(Date expirationDate) {
        return expirationDate != null && numberOfDaysLeft(expirationDate) <= 30;
    }

    public static long numberOfDaysLeft(Date expirationDate) {
        return Math.abs(Duration.between(
                new java.util.Date(expirationDate.getTime()).toInstant(),
                new Date().toInstant()
        ).toDays());
    }

    public Map<String, Map<String, Notification>> getLocalCache() {
        return localCache;
    }
}
