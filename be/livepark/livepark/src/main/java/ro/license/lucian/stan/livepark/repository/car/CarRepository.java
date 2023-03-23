package ro.license.lucian.stan.livepark.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.lucian.stan.livepark.entities.car.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
