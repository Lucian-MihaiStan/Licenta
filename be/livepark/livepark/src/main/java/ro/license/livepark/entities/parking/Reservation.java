package ro.license.livepark.entities.parking;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "parkingSpot_id", nullable = false)
    private ParkingSpot parkingSpot;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "expiration_time")
    private Date expirationTime;

    @Column(name = "used")
    private boolean isUsed;

    @Column(name = "user_id", nullable = false)
     private Long userId;

    @Column(name = "car_plate", nullable = false)
    private String carPlate;
}
