package ro.license.livepark.service.car;

import org.springframework.stereotype.Service;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.car.CarDTOMapper;
import ro.license.livepark.repository.car.CarRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;

    private final CarDTOMapper carDTOMapper;

    public CarService(CarRepository carRepository, CarDTOMapper carDTOMapper) {
        this.carRepository = carRepository;
        this.carDTOMapper = carDTOMapper;
    }

    public void addCar(Car car) {
        carRepository.save(car);
    }

    public Optional<CarDTO> findByInsuranceId(Long insuranceId) {
        List<CarDTO> byInsuranceId = carRepository.findByInsuranceId(insuranceId).stream().map(carDTOMapper).toList();
        if (byInsuranceId.isEmpty())
            return Optional.empty();

        return Optional.of(byInsuranceId.get(0));
    }

    public List<CarDTO> findByOwnerId(Long ownerId) {
        return carRepository.findByOwnerId(ownerId).stream().map(carDTOMapper).toList();
    }
}
