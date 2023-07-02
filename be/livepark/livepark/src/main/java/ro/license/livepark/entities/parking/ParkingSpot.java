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

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;


    public enum ParkingSpotStatus {
        UNKNOWN, OCCUPIED, EMPTY, RESERVED
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ParkingSpotStatus status = ParkingSpotStatus.UNKNOWN;

    @ManyToOne
    @JoinColumn(name = "parking_id", nullable = false)
    private Parking parking;

    @OneToMany(mappedBy = "parkingSpot", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservationList;

    @Column(name = "key")
    private Integer key;

    @Column(name = "isRotated")
    private boolean isRotated;

    @Column(name = "isAutoCreated")
    private boolean isAutoCreated;

    @Column(name = "isDeleted")
    private boolean isDeleted;

    @Column(name = "position_i")
    private int posI;

    @Column(name = "position_j")
    private int posJ;

    public void setStatus(ParkingSpotStatus status) {
        System.out.println("ParkingSpot with sensor deviceId " + getSensor().getDeviceName() + " changed the status from " + this.status + " to " + status);
        this.status = status;
    }

    public void setPosition(Position p) {
        posI = p.getI();
        posJ = p.getJ();
    }

    public Position getPosition() {
        return new Position(posI, posJ);
    }
}
