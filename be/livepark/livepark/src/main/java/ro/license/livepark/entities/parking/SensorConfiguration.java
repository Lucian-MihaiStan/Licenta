package ro.license.livepark.entities.parking;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Sensor_Configurations")
public class SensorConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id;

    @Column(name = "host")
    private String host;

    @Column(name = "port")
    private Integer port;

    @Column(name = "withTLS")
    private boolean withTLS;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "topic")
    private String topic;

    @JsonIgnore
    @OneToOne(mappedBy = "sensorConfig")
    private Parking parking;
}
