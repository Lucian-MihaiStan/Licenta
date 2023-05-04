package ro.license.livepark.controller.owner;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.controller.GlobalConstants;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.http.packages.received.HttpCardIdPkg;
import ro.license.livepark.service.driver.DriverService;
import ro.license.livepark.service.user.UserService;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    private final UserService userService;

    private final DriverService driverService;

    public OwnerController(UserService userService, DriverService driverService) {
        this.userService = userService;
        this.driverService = driverService;
    }

    @GetMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(
                UserInfo
                .builder()
                .userDTO(userService.getUserInfo(userId))
                .driverDTO(driverService.findDriverByUserId(userId))
                .build()
                .buildDTO()
        );
    }

    @PostMapping("/postIdCard")
    public ResponseEntity<?> postDriverCardId(@RequestBody HttpCardIdPkg documentPkg) {
        driverService.updateOrCreateDriverCardId(Long.valueOf(documentPkg.getUserId()), documentPkg.getDocumentId());
        return ResponseEntity.ok(GlobalConstants.OK_STATUS);
    }

    @PostMapping("/postLicenseCard")
    public ResponseEntity<?> postDriverLicenseCard(@RequestBody HttpCardIdPkg documentPkg) {
        driverService.updateOrCreateDriverLicenseId(Long.valueOf(documentPkg.getUserId()), documentPkg.getDocumentId());
        return ResponseEntity.ok(GlobalConstants.OK_STATUS);
    }

}
