package ro.license.LivePark.repository.car;

import org.springframework.data.repository.CrudRepository;
import ro.license.LivePark.entities.car.CarEntity;

public interface CarRepository extends CrudRepository<CarEntity, Long> {
}
