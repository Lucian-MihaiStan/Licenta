package ro.license.livepark.jobs;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ro.license.livepark.email.NotificationEmailService;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.entities.parking.Reservation;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.ReservationRepository;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.driver.DriverService;
import ro.license.livepark.service.notification.NotificationService;
import ro.license.livepark.service.parking.ParkingSpotService;
import ro.license.livepark.service.parking.ReservationService;
import ro.license.livepark.service.user.UserService;

import java.util.Date;
import java.util.List;
import java.util.Map;

@EnableScheduling
@Component
@RequiredArgsConstructor
public class CheckReservationsAvailabilityJob {

    private final Logger logger = LoggerFactory.getLogger(CheckReservationsAvailabilityJob.class);
    private final ReservationRepository reservationRepository;
    private final UserService userService;
    private final ParkingSpotRepository parkingSpotRepository;
    private final NotificationEmailService emailService;

    @Scheduled(fixedDelay = 60000)
    public void runJob() {
        logger.info("Check Reservations Availability Job is running...");
        List<Reservation> reservations = reservationRepository.findAllByIsUsedFalse();
        reservations = reservations.stream().filter(r -> r.getParkingSpot().getStatus() == ParkingSpot.ParkingSpotStatus.RESERVED &&
                                                        r.getExpirationTime().before(new Date())).toList();
        for (Reservation r : reservations) {
            logger.info("Reservation with id " + r.getId() + " was not used and is now expired.");
            r.getParkingSpot().setStatus(ParkingSpot.ParkingSpotStatus.EMPTY);
            parkingSpotRepository.save(r.getParkingSpot());
            User user = userService.findById(r.getUserId());
            String email = user.getEmail();
            String content = """
                    Dear [[name]],<br><br>
                    The reservation you recently made for the car with the registration plate [[car_plate]] was not used and is now expired.<br>
                    The parking spot number [[number]] from "[[parking_name]]" is no longer reserved.<br>
                    If you want to make another reservation, feel free to check the available parking areas.<br><br>
                    Thank you,<br>ParkLive.""";
            content = content.replace("[[name]]", user.getFullName());
            content = content.replace("[[car_plate]]", r.getCarPlate());
            content = content.replace("[[number]]", r.getParkingSpot().getNumber());
            content = content.replace("[[parking_name]]", r.getParkingSpot().getParking().getName());
            try {
                emailService.send(
                        email,
                        "ParkLive - Expired reservation",
                        content
                );
            } catch (Exception e) {
                System.err.println("Unable to send email to " + email);
                e.printStackTrace();
            }
        }
    }

}
