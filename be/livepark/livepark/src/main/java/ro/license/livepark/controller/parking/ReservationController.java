package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ReservationDTO;
import ro.license.livepark.dto.parking.ReservationInfoDTO;
import ro.license.livepark.service.parking.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Resource
    private ReservationService reservationService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservation(@PathVariable("id") int id) {
        ReservationInfoDTO r = reservationService.getReservationInfo(id);
        if (r == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addReservation(@RequestBody ReservationDTO reservationDTO) {
        if (reservationService.addReservation(reservationDTO))
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable("id") int id) {
        if (reservationService.deleteReservation(id))
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
