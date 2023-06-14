package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ParkingSpotDTO;
import ro.license.livepark.service.parking.ParkingSpotService;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/parkingSpots")
public class ParkingSpotController {

    @Resource
    private ParkingSpotService parkingSpotService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getParkingSpot(@PathVariable("id") int id) {
        ParkingSpotDTO p = parkingSpotService.getParkingSpot(id);
        if (p == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllParkingSpotsFromParking(@RequestParam("parkingId") int id) {
        List<ParkingSpotDTO> parkingSpots = parkingSpotService.getAllParkingSpotsFromParking(id);
        if (parkingSpots == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(parkingSpots, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addParkingSpots(@RequestBody List<ParkingSpotDTO> parkingSpotDTOs,
                                             @RequestParam("parkingId") Integer parkingId) {
        if (parkingSpotService.addParkingSpots(parkingSpotDTOs, parkingId))
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<?> updateParkingSpots(@RequestBody List<ParkingSpotDTO> parkingSpotDTOs,
                                                @RequestParam("parkingId") int parkingId) {
        if (parkingSpotService.updateParkingSpots(parkingSpotDTOs, parkingId))
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParkingSpot(@PathVariable("id") int id) {
        if (!parkingSpotService.deleteParkingSpot(id))
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
