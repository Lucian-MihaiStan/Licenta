package ro.license.livepark.service.driver;

import org.springframework.stereotype.Service;
import ro.license.livepark.entities.driver.Driver;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.driver.DriverDTOMapper;
import ro.license.livepark.entities.driver.Gender;
import ro.license.livepark.repository.driver.DriverRepository;

import java.util.Optional;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final DriverDTOMapper driverDTOMapper;

    public DriverService(DriverRepository driverRepository, DriverDTOMapper driverDTOMapper) {
        this.driverRepository = driverRepository;
        this.driverDTOMapper = driverDTOMapper;
    }

    public void updateOrCreateDriverCardId(Long userId, String cardId) {
        Optional<Driver> driver = driverRepository.findByUserId(userId);
        if (driver.isPresent()) {
            driverRepository.updateCardId(userId, cardId);
            return;
        }

        driverRepository.save(
                Driver
                .builder()
                .userId(userId)
                .identityCardId(cardId)
                .gender(Gender.UNSPECIFIED)
                .build()
        );
    }

    public void updateOrCreateDriverLicenseId(Long userId, String driverLicense) {
        Optional<Driver> driver = driverRepository.findByUserId(userId);
        if (driver.isPresent()) {
            driverRepository.updateDriverLicenseId(userId, driverLicense);
            return;
        }

        driverRepository.save(
                Driver
                .builder()
                .userId(userId)
                .licenseId(driverLicense)
                .gender(Gender.UNSPECIFIED)
                .build()
        );
    }

    public DriverDTO findDriverByUserId(Long userId) {
        return driverRepository.findByUserId(userId).isPresent() ?
                driverDTOMapper.apply(driverRepository.findByUserId(userId).get()) :
                null;
    }
}
