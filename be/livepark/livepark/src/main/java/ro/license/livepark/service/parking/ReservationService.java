package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.dto.parking.ReservationDTO;
import ro.license.livepark.dto.parking.ReservationInfoDTO;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.entities.parking.Reservation;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.ReservationRepository;

import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class ReservationService {
    @Resource
    private ReservationRepository reservationRepository;

    @Resource
    private ParkingSpotRepository parkingSpotRepository;

    public ReservationInfoDTO getReservationInfo(int id) {
        if (reservationRepository.findById(id).isEmpty())
            return null;
        Reservation r = reservationRepository.findById(id).get();
        ReservationInfoDTO dto = new ReservationInfoDTO();
        dto.setParking_name(r.getParkingSpot().getParking().getName());
        dto.setParkingSpot_number(r.getParkingSpot().getNumber());
        dto.setCreatedTime(r.getCreatedTime());
        dto.setExpirationTime(r.getExpirationTime());
        return dto;
    }

    public boolean addReservation(ReservationDTO dto) {
        // TODO check parking spot status by accessing the sensor endpoint
        if (parkingSpotRepository.findById(dto.getParkingSpot_id()).isEmpty())
            return false;
        ParkingSpot p = parkingSpotRepository.findById(dto.getParkingSpot_id()).get();
        if (!p.getStatus().equals(ParkingSpot.ParkingSpotStatus.EMPTY))
            return false;
        Reservation r = new Reservation();
        r.setParkingSpot(p);
        Date now = new Date();
        r.setCreatedTime(now);
        Date expirationTime = Date.from(now.toInstant().plus(p.getParking().getEXPIRATION_HOURS(), ChronoUnit.HOURS)
                                                       .plus(p.getParking().getEXPIRATION_MINUTES(), ChronoUnit.MINUTES));
        r.setExpirationTime(expirationTime);
        reservationRepository.save(r);
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
