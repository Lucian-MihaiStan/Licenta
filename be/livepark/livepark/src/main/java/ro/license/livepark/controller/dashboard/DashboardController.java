package ro.license.livepark.controller.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.packages.received.AddCarRequestPkg;
import ro.license.livepark.service.user.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PostMapping("/addcar")
    public ResponseEntity<?> addCar( @RequestBody AddCarRequestPkg carRequestPkg) {

        if ("".equals(carRequestPkg.getInsuranceId()))
            return ResponseEntity.badRequest().body("Insurance ID is null");

        if ("".equals(carRequestPkg.getInspectionId()))
            return ResponseEntity.badRequest().body("Inspection ID is null");

        return dashboardService.addCar(carRequestPkg);
    }

    @RequestMapping("/getOwnersCars")
    public ResponseEntity<List<CarDTO>> getOwnersCars(@RequestParam Long ownerId) {
        return dashboardService.getOwnersCars(ownerId);
    }

    @RequestMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam Long userId) {
        return dashboardService.getUserInfo(userId);
    }

}
