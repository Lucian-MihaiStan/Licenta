package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;

import java.util.List;

@Repository("ParkingSpotRepository")
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Integer> {

    public List<ParkingSpot> findAllByParkingOrderByPosIAscPosJAsc(Parking parking);
}
