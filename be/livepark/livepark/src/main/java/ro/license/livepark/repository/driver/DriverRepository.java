package ro.license.livepark.repository.driver;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.driver.Driver;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE Driver d SET d.identityCardId = ?2 WHERE d.userId = ?1")
    void updateCardId(Long userId, String cardId);

    @Transactional
    @Modifying
    @Query("UPDATE Driver d SET d.licenseId = ?2 WHERE d.userId = ?1")
    void updateDriverLicenseId(Long userId, String driverLicense);
}
