package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.Reservation;

@Repository("ReservationRepository")
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}
