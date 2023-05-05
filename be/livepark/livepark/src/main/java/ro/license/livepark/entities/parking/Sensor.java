package ro.license.livepark.entities.parking;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "accessUrl")
    private String accessUrl;

    @OneToOne(mappedBy = "sensor")
    @JoinColumn(name = "parkingSpot_id")
    private ParkingSpot parkingSpot;
}
