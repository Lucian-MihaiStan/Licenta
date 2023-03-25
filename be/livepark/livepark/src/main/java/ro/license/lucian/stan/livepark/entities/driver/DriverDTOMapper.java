package ro.license.lucian.stan.livepark.entities.driver;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DriverDTOMapper implements Function<Driver, DriverDTO> {
    @Override
    public DriverDTO apply(Driver driver) {
        if (driver == null)
            return null;

        return new DriverDTO(
                driver.getDriverId(),
                driver.getGender()
        );
    }
}
