package ro.license.livepark.entities.parking;

import jakarta.persistence.*;
import lombok.*;
import ro.license.livepark.dto.parking.Position;

import java.util.List;

@Data
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


    public enum ParkingSpotStatus {
        UNKNOWN, OCCUPIED, EMPTY, RESERVED
    }

    @Column(name = "status")
    private ParkingSpotStatus status = ParkingSpotStatus.UNKNOWN;

    @ManyToOne
    @JoinColumn(name = "parking_id", nullable = false)
    private Parking parking;

    @OneToMany(mappedBy = "parkingSpot", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservationList;

    @Transient
    private Integer key;

    @Transient
    private boolean isRotated;

    @Transient
    private  boolean isAutoCreated;

    @Transient
    private boolean isDeleted;

    @Transient
    private Position position;
}
