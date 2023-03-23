package ro.license.lucian.stan.livepark.controller.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.license.lucian.stan.livepark.entities.car.Car;
import ro.license.lucian.stan.livepark.service.car.CarService;

import java.util.List;

@Service
public class DashboardService {

    private final CarService carService;

    public DashboardService(CarService carService) {
        this.carService = carService;
    }

    public List<Car> findAllCars() {
        return carService.findAll();
    }
}
