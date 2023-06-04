package ro.license.livepark.controller.car;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.car.CarBrand;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.driver.Driver;
import ro.license.livepark.http.packages.received.CarIdDocumentExpiration;
import ro.license.livepark.http.packages.received.CarIdEquipment;
import ro.license.livepark.http.packages.received.DocumentIdEntityPkg;
import ro.license.livepark.http.packages.received.HttpCarPkg;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.driver.DriverService;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/car")
@RestController
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
                        .build()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "Car Added");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getOwnersCars(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(carService.findByOwnerId(driverService.findDriverDTOByUserId(userId).driverId()));
    }

    @GetMapping("/car")
    public ResponseEntity<CarDTO> getCarDocuments(@RequestParam("carId") Long carId) {
        return carService.findById(carId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/car/equipment")
    public ResponseEntity<?> addCarEquipment(@RequestBody CarIdEquipment carRequestPkg) {
        carService.updateDocumentByCarId(carRequestPkg);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/car/document")
    public ResponseEntity<?> addCarDocument(@RequestBody DocumentIdEntityPkg carIdDocument) {
        carService.updateCarDocumentByCarId(carIdDocument);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/car/documentExpirationDate")
    public ResponseEntity<?> addCarDocumentExpirationDate(@RequestBody CarIdDocumentExpiration carIdDocument) {
        carService.updateCarDocumentByCarIdExpiration(carIdDocument);
        return ResponseEntity.ok().build();
    }

}
