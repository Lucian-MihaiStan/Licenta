package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.Parking;

import java.util.List;

@Repository("ParkingRepository")
public interface ParkingRepository extends JpaRepository<Parking, Integer> {
    @Query(value = "SELECT * FROM Parkings WHERE   name  LIKE BINARY BINARY CONCAT('%',:word,'%')", nativeQuery = true)
    List<Parking> findAllByWordInName(@Param("word") String word);
}
