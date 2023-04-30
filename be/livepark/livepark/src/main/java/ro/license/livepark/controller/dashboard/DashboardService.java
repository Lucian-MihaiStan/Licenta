package ro.license.livepark.controller.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.license.livepark.entities.car.Car;
import ro.license.livepark.entities.car.CarBrand;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.packages.received.AddCarRequestPkg;
import ro.license.livepark.service.car.CarService;
import ro.license.livepark.service.user.UserService;

import java.sql.Date;
import java.util.List;

@Service
public class DashboardService {

    private final CarService carService;

    private final UserService userService;

    public DashboardService(CarService carService, UserService userService) {
        this.carService = carService;
        this.userService = userService;
    }

    public ResponseEntity<?> addCar(AddCarRequestPkg carRequestPkg) {
        carService.findByInsuranceId(Long.valueOf(carRequestPkg.getInsuranceId())).ifPresent(car -> {
            throw new IllegalStateException("Insurance already exists");
        });


        Car car = Car
                .builder()
                .ownerId(Long.valueOf(carRequestPkg.getOwnerId()))
                .plate(carRequestPkg.getPlate())
                .vin(carRequestPkg.getVin())
                .brand(CarBrand.AUDI)
                .model(carRequestPkg.getModel())
                .fabricationDate(Date.valueOf(carRequestPkg.getFabricationDate()))
                .insuranceId(Long.valueOf(carRequestPkg.getInsuranceId()))
                .inspectionId(Long.valueOf(carRequestPkg.getInspectionId()))
                .build();

        carService.addCar(car);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<List<CarDTO>> getOwnersCars(Long ownerId) {
        return ResponseEntity.ok(carService.findByOwnerId(ownerId));
    }

    public ResponseEntity<?> getUserInfo(Long userId) {
        UserDTO userInfo = userService.getUserInfo(userId);
        if (userInfo == null)
            return ResponseEntity.badRequest().body("User not found");

        return ResponseEntity.ok(userInfo);
    }
}
