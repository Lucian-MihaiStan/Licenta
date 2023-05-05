package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.ParkingSpot;

@Repository("ParkingSpotRepository")
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Integer> {
}
