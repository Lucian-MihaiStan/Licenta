package ro.license.LivePark.model.car;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
public class Car {

    @Id
    private Long carId;

    private String plate;

    private String vin;



}
