package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ParkingDTO;
import ro.license.livepark.dto.parking.ParkingInfoDTO;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.service.parking.ParkingService;
import ro.license.livepark.service.user.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/parkings")
public class ParkingController {

    @Resource
    private ParkingService parkingService;

    @Resource
    private UserService userService;

    @GetMapping
    public List<ParkingInfoDTO> getAllParkingsInfo() {
        return parkingService.getAllParkingsInfo();
    }

    @PostMapping
    public ResponseEntity<?> addParking(@RequestBody ParkingDTO parkingDTO) {
        User authenticatedUser = userService.getAuthenticatedUser();
        if (authenticatedUser.getRole() == UserRole.USER)
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        int id = parkingService.addParking(parkingDTO, authenticatedUser.getUserId());
        if (id == -1)
            return new ResponseEntity<>("Could not add the parking: please check the MQTT connection details.",
                    HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getParking(@PathVariable("id") int id) {
       ParkingDTO p = parkingService.getParkingDTO(id);
       if (p == null)
           return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
       return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyParking(@PathVariable("id") int id, @RequestBody ParkingDTO parkingDTO) {
        if (isUnauthorized(id))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        boolean ok = parkingService.modifyParking(id, parkingDTO);
        if (ok)
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParking(@PathVariable("id") int id) {
        if (isUnauthorized(id))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        boolean ok = parkingService.deleteParking(id);
        if (ok)
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    private boolean isUnauthorized(@PathVariable("id") int id) {
        User authenticatedUser = userService.getAuthenticatedUser();
        Parking p = parkingService.getParking(id);
        boolean isParkingAdmin = (p != null && p.getAdminId() == authenticatedUser.getUserId());
        return authenticatedUser.getRole() == UserRole.USER ||
                (authenticatedUser.getRole() == UserRole.ADMIN && !isParkingAdmin);
    }

}
