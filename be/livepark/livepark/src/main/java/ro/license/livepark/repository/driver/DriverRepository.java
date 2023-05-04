package ro.license.livepark.repository.driver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.driver.Driver;

import java.util.Optional;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByUserId(Long userId);

    @Query("UPDATE Driver d SET d.identityCardId = ?2 WHERE d.userId = ?1")
    void updateCardId(Long userId, String cardId);

    @Query("UPDATE Driver d SET d.licenseId = ?2 WHERE d.userId = ?1")
    void updateDriverLicenseId(Long userId, String driverLicense);
}
