package ro.license.livepark.entities.parking;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "parkingSpot_id")
    private ParkingSpot parkingSpot;

    @CreatedDate
    @Column(name = "createdDate")
    private Date createdDate;

    @Column(name = "expirationDate")
    private Date expirationDate;

    // private User user;
}
