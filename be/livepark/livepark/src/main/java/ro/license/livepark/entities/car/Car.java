package ro.license.livepark.entities.car;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.license.livepark.entities.driver.Driver;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "car")
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id", unique = true, nullable = false)
    private Long carId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    @Column(name = "plate", unique = true, nullable = false)
    private String plate;

    @Column(name = "vin", unique = true, nullable = false)
    private String vin;

    @Column(name = "brand", nullable = false)
    private CarBrand brand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "fabrication_date", nullable = false)
    private Date fabricationDate;

    @Column(name = "insurance_id", nullable = false, unique = true)
    private String insuranceId;

    @Column(name = "inspection_id", nullable = false, unique = true)
    private String inspectionId;


}
