package ro.license.livepark.controller.car;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.car.CarBrand;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.driver.Driver;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.http.packages.received.HttpCarPkg;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.driver.DriverService;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/car")
public class CarController {

    private final CarService carService;
    private final DriverService driverService;

    public CarController(CarService carService, DriverService driverService) {
        this.carService = carService;
        this.driverService = driverService;
    }

    @PostMapping("/addcar")
    public ResponseEntity<?> addCar(@RequestBody HttpCarPkg carRequestPkg) {
        Driver driver = driverService.findDriverByUserId(Long.valueOf(carRequestPkg.getOwnerId()));

        carService.addCar(
                Car
                        .builder()
                        .driver(driver)
                        .vin(carRequestPkg.getVin())
                        .plate(carRequestPkg.getPlate())
                        .brand(CarBrand.AUDI)
                        .model(carRequestPkg.getModel())
                        .fabricationDate(Date.valueOf(carRequestPkg.getFabricationDate()))
                        .insuranceId("")
                        .inspectionId("")
                        .build()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "Car Added");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getOwnersCars(@RequestParam("ownerId") Long ownerId) {
        return ResponseEntity.ok(carService.findByOwnerId(ownerId));
    }

    @GetMapping("/car")
    public ResponseEntity<CarDTO> getCarDocuments(@RequestParam("carId") Long carId) {
        return carService.findById(carId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

}
