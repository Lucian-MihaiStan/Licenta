package ro.license.livepark.entities.parking;

import jakarta.persistence.*;
import lombok.*;
import org.eclipse.paho.client.mqttv3.MqttClient;
import ro.license.livepark.config.parkingUtils.SensorConfiguration;

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

    @Column(name = "latitude")
    private Double lat;

    @Column(name = "longitude")
    private Double lng;

    @Column(name = "parking_fee")
    private String parkingFee;

    @OneToMany(mappedBy = "parking", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ParkingSpot> parkingSpots;

    @Column(name = "reservation_hours")
    private Integer EXPIRATION_HOURS;

    @Column(name = "reservation_minutes")
    private Integer EXPIRATION_MINUTES;

    @Column(name = "admin_id")
    private Long adminId;

    @Transient
    private SensorConfiguration sensorConfig;

    @Transient
    private MqttClient mqttClient;
}
