package ro.license.livepark.entities.driver;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Driver")
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id", unique = true, nullable = false)
    private Long driverId;

    @Column(name = "license_id", unique = true, nullable = false)
    private Long licenseId;

    @Column(name = "identity_card_id", unique = true, nullable = false)
    private Long identityCardId;

    @Column(name = "gender", nullable = false)
    private Gender gender;
}
