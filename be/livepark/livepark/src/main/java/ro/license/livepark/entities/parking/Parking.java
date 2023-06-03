package ro.license.livepark.entities.parking;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Parkings")
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "mapsLink")
    private String mapsLink;

    // private User admin;

    @Column(name = "parkingFee")
    private String parkingFee;

    @OneToMany(mappedBy = "parking", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ParkingSpot> parkingSpots;

    @Transient
    private Integer EXPIRATION_HOURS;

    @Transient
    private Integer EXPIRATION_MINUTES;
}
