package ro.license.LivePark.entities;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Entity
@Table(name="cars")
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="car_id", unique = true, nullable = false)
    private Long carId;


}
