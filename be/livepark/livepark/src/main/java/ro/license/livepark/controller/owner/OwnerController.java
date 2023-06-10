package ro.license.livepark.controller.owner;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.controller.GlobalConstants;
import ro.license.livepark.http.packages.received.DocumentIdEntityPkg;
import ro.license.livepark.service.driver.DriverService;
import ro.license.livepark.service.user.UserService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final UserService userService;

    private final DriverService driverService;

    @GetMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(
                UserInfo
                .builder()
                .userDTO(userService.getUserInfo(userId))
                .driverDTO(driverService.findDriverDTOByUserId(userId))
                .build()
                .buildDTO()
        );
    }

    @PostMapping("/postIdCard")
    public ResponseEntity<?> postDriverCardId(@RequestBody DocumentIdEntityPkg documentPkg) {
        driverService.updateOrCreateDriverCardId(documentPkg.getEntityId(), documentPkg.getDocumentId());
        return ResponseEntity.ok(GlobalConstants.OK_STATUS);
    }

    @PostMapping("/postLicenseCard")
    public ResponseEntity<?> postDriverLicenseCard(@RequestBody DocumentIdEntityPkg documentPkg) {
        driverService.updateOrCreateDriverLicenseId(documentPkg.getEntityId(), documentPkg.getDocumentId());
        return ResponseEntity.ok(GlobalConstants.OK_STATUS);
    }

}
