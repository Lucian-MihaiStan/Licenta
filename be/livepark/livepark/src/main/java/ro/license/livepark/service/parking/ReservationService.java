package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.dto.parking.ReservationDTO;
import ro.license.livepark.dto.parking.ReservationInfoDTO;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.entities.parking.Reservation;
import ro.license.livepark.repository.parking.ParkingRepository;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.ReservationRepository;

import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
public class ReservationService {
    @Resource
    private ReservationRepository reservationRepository;

    @Resource
    private ParkingSpotRepository parkingSpotRepository;

    @Resource
    private ParkingRepository parkingRepository;

    public ReservationInfoDTO getReservationInfo(int id) {
        if (reservationRepository.findById(id).isEmpty())
            return null;
        Reservation r = reservationRepository.findById(id).get();
        return new ReservationInfoDTO(r);
    }

    public Reservation getReservation(int id) {
        if (reservationRepository.findById(id).isEmpty())
            return null;
        return reservationRepository.findById(id).get();
    }

    public List<ReservationInfoDTO> getAllUserReservations(Long userId) {
        return reservationRepository.findAllByUserIdOrderByCreatedTimeDesc(userId).stream().map(ReservationInfoDTO::new).toList();
    }

    public List<ReservationInfoDTO> getReservationsForAdmin(Long adminId) {
        Date now = new Date();
        Date startDate = Date.from(now.toInstant().minus(1, ChronoUnit.DAYS));
        List<Parking> parkings = parkingRepository.findAllByAdminId(adminId);
        List<Reservation> reservations = reservationRepository.findAllByExpirationTimeAfterOrderByExpirationTimeDesc(startDate);
        reservations = reservations.stream().filter( r -> parkings.contains(r.getParkingSpot().getParking())).toList();
        return reservations.stream().map(ReservationInfoDTO::new).toList();
    }

    public boolean addReservation(ReservationDTO dto, Long userId) {
        if (parkingSpotRepository.findById(dto.getParkingSpot_id()).isEmpty())
            return false;
        ParkingSpot p = parkingSpotRepository.findById(dto.getParkingSpot_id()).get();
        if (!p.getStatus().equals(ParkingSpot.ParkingSpotStatus.EMPTY))
            return false;
        if (reservationRepository.findAllByCarPlateAndExpirationTimeAfter(dto.getCarPlate(), new Date()).size() != 0)
            return false;
        Reservation r = new Reservation();
        r.setParkingSpot(p);
        Date now = new Date();
        r.setCreatedTime(now);
        Date expirationTime = Date.from(now.toInstant().plus(p.getParking().getEXPIRATION_HOURS(), ChronoUnit.HOURS)
                                                       .plus(p.getParking().getEXPIRATION_MINUTES(), ChronoUnit.MINUTES));
        r.setExpirationTime(expirationTime);
        r.setCarPlate(dto.getCarPlate());
        r.setUserId(userId);
        reservationRepository.save(r);
        r.getParkingSpot().setStatus(ParkingSpot.ParkingSpotStatus.RESERVED);
        parkingSpotRepository.save(r.getParkingSpot());
        return true;
    }

    public boolean deleteReservation(int id) {
        if (reservationRepository.findById(id).isEmpty())
            return false;
        Reservation r = reservationRepository.findById(id).get();
        reservationRepository.delete(r);
        return true;
    }
}
