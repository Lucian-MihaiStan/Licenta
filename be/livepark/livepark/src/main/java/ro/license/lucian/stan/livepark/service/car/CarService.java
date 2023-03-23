package ro.license.lucian.stan.livepark.service.car;

import org.springframework.stereotype.Service;
import ro.license.lucian.stan.livepark.entities.car.Car;
import ro.license.lucian.stan.livepark.repository.car.CarRepository;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }
}
