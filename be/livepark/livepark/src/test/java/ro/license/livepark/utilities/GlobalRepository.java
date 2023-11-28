package ro.license.livepark.utilities;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.license.livepark.repository.car.CarRepository;
import ro.license.livepark.repository.driver.DriverRepository;
import ro.license.livepark.repository.notification.NotificationRepository;
import ro.license.livepark.repository.parking.ParkingRepository;
import ro.license.livepark.repository.password.ResetPasswordRepository;
import ro.license.livepark.repository.user.UserRepository;

@Service
@RequiredArgsConstructor
public class GlobalRepository {

    private final CarRepository carRepository;
    private final DriverRepository driverRepository;
    private final NotificationRepository notificationRepository;
    private final ParkingRepository parkingRepository;
    private final ResetPasswordRepository resetPasswordRepository;
    private final UserRepository userRepository;

    public void clearAll() {
        carRepository.deleteAll();
        driverRepository.deleteAll();
        notificationRepository.deleteAll();
        parkingRepository.deleteAll();
        resetPasswordRepository.deleteAll();
        userRepository.deleteAll();
    }

}
