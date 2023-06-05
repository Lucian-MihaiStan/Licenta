package ro.license.livepark.entities.parking;

import jakarta.persistence.*;
import lombok.*;

@Data
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
    private ParkingSpot parkingSpot;
}
