package ro.license.livepark.repository.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.parking.Sensor;

@Repository("SensorRepository")
public interface SensorRepository extends JpaRepository<Sensor, Integer> {
}
