package ro.license.livepark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.service.driver.DriverService;
import ro.license.livepark.service.user.UserService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DriverService driverService;
    private final UserService userService;

    public DashboardController(DriverService driverService, UserService userService) {
        this.driverService = driverService;
        this.userService = userService;
    }

    @RequestMapping
    public ResponseEntity<?> getDashboardInfo(@RequestParam("userId") Long userId) {
        UserDTO userInfo = userService.getUserInfo(userId);
        if (userInfo == null)
            return ResponseEntity.badRequest().body("User not found");

        driverService.createDriver(userId);

        return ResponseEntity.ok(userInfo);
    }
}
