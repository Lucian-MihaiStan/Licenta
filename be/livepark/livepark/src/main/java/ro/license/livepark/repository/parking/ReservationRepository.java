package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.Reservation;

import java.util.Date;
import java.util.List;

@Repository("ReservationRepository")
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    public List<Reservation> findAllByUserIdOrderByCreatedTimeDesc(Long userId);
    public List<Reservation> findAllByExpirationTimeAfterOrderByExpirationTimeDesc(Date d);
    public List<Reservation> findAllByCarPlateAndExpirationTimeAfter(String carPlate, Date d);
}
