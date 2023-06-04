package ro.license.livepark.entities.car;

import jakarta.persistence.*;
import lombok.*;
import ro.license.livepark.entities.driver.Driver;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "car")
@Table(name = "cars")
@ToString(exclude = "driver")
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

    @Column(name = "rca_id", unique = true)
    private String rcaId;

    @Column(name = "rca_expiration_date")
    private Date rcaExpirationDate;

    @Column(name = "itp_id", unique = true)
    private String itpId;

    @Column(name = "itp_expiration_date")
    private Date itpExpirationDate;

    @Column(name = "rovinieta_id", unique = true)
    private String rovinietaId;

    @Column(name = "rovinieta_expiration_date")
    private Date rovinietaExpirationDate;

    @Column(name = "casco_id", unique = true)
    private String cascoId;

    @Column(name = "casco_expiration_date")
    private Date cascoExpirationDate;

    @Column(name = "fire_extinguisher_expiration_date")
    private Date fireExtinguisherExpirationDate;

    @Column(name = "first_aid_kit_expiration_date")
    private Date firstAidKitExpirationDate;
}
