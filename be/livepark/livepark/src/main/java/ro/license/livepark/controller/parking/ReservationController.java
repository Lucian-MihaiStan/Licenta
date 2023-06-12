package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.dto.parking.ReservationDTO;
import ro.license.livepark.dto.parking.ReservationInfoDTO;
import ro.license.livepark.entities.parking.Reservation;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.service.parking.ReservationService;
import ro.license.livepark.service.user.UserService;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Resource
    private ReservationService reservationService;

    @Resource
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserReservations() {
        User user = userService.getAuthenticatedUser();
        List<ReservationInfoDTO> reservations = reservationService.getAllUserReservations(user.getUserId());
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/allForAdmin")
    public ResponseEntity<?> getReservationsForAdmin() {
        User user = userService.getAuthenticatedUser();
        if (user.getRole() == UserRole.USER)
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        List<ReservationInfoDTO> reservations = reservationService.getReservationsForAdmin(user.getUserId());
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservation(@PathVariable("id") int id) {
        User user = userService.getAuthenticatedUser();
        ReservationInfoDTO r = reservationService.getReservationInfo(id);
        if (r == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        if (canViewReservation(user, reservationService.getReservation(id)))
            return new ResponseEntity<>(r, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping
    public ResponseEntity<?> addReservation(@RequestBody ReservationDTO reservationDTO) {
        User authenticatedUser = userService.getAuthenticatedUser();
        if (reservationService.addReservation(reservationDTO, authenticatedUser.getUserId()))
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable("id") int id) {
        User authenticatedUser = userService.getAuthenticatedUser();
        if (reservationService.deleteReservation(id))
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        if (!Objects.equals(authenticatedUser.getUserId(), reservationService.getReservation(id).getUserId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    private boolean canViewReservation(User user, Reservation r) {
        if (Objects.equals(r.getUserId(), user.getUserId()))
            return true;
        if (Objects.equals(r.getParkingSpot().getParking().getAdminId(), user.getUserId()) && user.getRole() == UserRole.ADMIN)
            return true;
        return user.getRole() == UserRole.MASTER;
    }
}
