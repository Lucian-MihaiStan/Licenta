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
@Table(name = "ParkingSpots")
public class ParkingSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "number")
    private String number;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

    @Column(name = "isOccupied")
    private Boolean isOccupied;

    @ManyToOne
    @JoinColumn(name = "parking_id", nullable = false)
    private Parking parking;
}
