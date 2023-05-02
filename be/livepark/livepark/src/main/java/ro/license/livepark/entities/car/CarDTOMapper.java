package ro.license.livepark.entities.car;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CarDTOMapper implements Function<Car, CarDTO> {

    @Override
    public CarDTO apply(Car car) {
        if (car == null)
            return null;

        return new CarDTO(
                car.getCarId(),
                car.getOwnerId(),
                car.getPlate(),
                car.getVin(),
                car.getModel()
//                car.getBrand()
        );
    }

}
