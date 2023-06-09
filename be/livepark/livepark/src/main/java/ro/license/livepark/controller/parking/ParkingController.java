package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ParkingDTO;
import ro.license.livepark.dto.parking.ParkingInfoDTO;
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

    @GetMapping
    public List<ParkingInfoDTO> getAllParkingsInfo() {
        return parkingService.getAllParkingsInfo();
    }

    @PostMapping
    public ResponseEntity<?> addParking(@RequestBody ParkingDTO parkingDTO, @RequestParam("userId") Long adminId) {
        int id = parkingService.addParking(parkingDTO, adminId);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getParking(@PathVariable("id") int id) {
       ParkingDTO p = parkingService.getParking(id);
       if (p == null)
           return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
       return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyParking(@PathVariable("id") int id, @RequestBody ParkingDTO parkingDTO) {
        boolean ok = parkingService.modifyParking(id, parkingDTO);
        if (ok)
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParking(@PathVariable("id") int id) {
        boolean ok = parkingService.deleteParking(id);
        if (ok)
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

}
