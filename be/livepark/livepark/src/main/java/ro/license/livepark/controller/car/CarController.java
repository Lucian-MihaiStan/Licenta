package ro.license.livepark.controller.car;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.car.CarBrand;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.car.HttpCarMapper;
import ro.license.livepark.http.packages.received.HttpCarPkg;
import ro.license.livepark.service.car.CarService;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/car")
public class CarController {

    private final HttpCarMapper httpCarMapper;
    private final CarService carService;

    public CarController(HttpCarMapper httpCarMapper, CarService carService) {
        this.httpCarMapper = httpCarMapper;
        this.carService = carService;
    }

    @PostMapping("/addcar")
    public ResponseEntity<?> addCar(@RequestBody HttpCarPkg carRequestPkg) {
        if ("".equals(carRequestPkg.getInsuranceId()))
            return ResponseEntity.badRequest().body("Insurance ID is null");

        if ("".equals(carRequestPkg.getInspectionId()))
            return ResponseEntity.badRequest().body("Inspection ID is null");

        if (carService.findByInsuranceId(Long.valueOf(carRequestPkg.getInsuranceId())).isPresent())
            return ResponseEntity.badRequest().body("Insurance already exists");

        carService.addCar(httpCarMapper.apply(carRequestPkg));

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
