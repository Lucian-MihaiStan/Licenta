package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ParkingSpotDTO;
import ro.license.livepark.dto.parking.ReservationDTO;
import ro.license.livepark.dto.parking.ReservationInfoDTO;
import ro.license.livepark.dto.parking.SensorDTO;
import ro.license.livepark.service.parking.SensorService;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Resource
    private SensorService sensorService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getSensor(@PathVariable("id") int id) {
        SensorDTO s = sensorService.getSensor(id);
        if (s == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addSensor(@RequestBody SensorDTO sensorDTO) {
        if (sensorService.addSensor(sensorDTO))
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifySensor(@PathVariable("id") int id, @RequestBody SensorDTO sensorDTO) {
        if (sensorService.modifySensor(id, sensorDTO))
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSensor(@PathVariable("id") int id) {
        if (sensorService.deleteSensor(id))
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
