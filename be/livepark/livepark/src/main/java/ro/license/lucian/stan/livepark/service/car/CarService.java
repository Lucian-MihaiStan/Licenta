package ro.license.lucian.stan.livepark.service.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.license.lucian.stan.livepark.entities.car.Car;
import ro.license.lucian.stan.livepark.entities.car.CarDTO;
import ro.license.lucian.stan.livepark.entities.car.CarDTOMapper;
import ro.license.lucian.stan.livepark.repository.car.CarRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;

    private final CarDTOMapper carDTOMapper;

    public CarService(CarRepository carRepository, CarDTOMapper carDTOMapper) {
        this.carRepository = carRepository;
        this.carDTOMapper = carDTOMapper;
    }

    public List<CarDTO> findAll() {
        return carRepository.findAll().stream().map(carDTOMapper).collect(Collectors.toList());
    }
}
