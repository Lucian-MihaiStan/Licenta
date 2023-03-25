package ro.license.lucian.stan.livepark.controller.dashboard;

import org.springframework.stereotype.Service;
import ro.license.lucian.stan.livepark.entities.car.CarDTO;
import ro.license.lucian.stan.livepark.service.car.CarService;

import java.util.List;

@Service
public class DashboardService {

    private final CarService carService;

    public DashboardService(CarService carService) {
        this.carService = carService;
    }

    public List<CarDTO> findAllCars() {
        return carService.findAll();
    }
}
