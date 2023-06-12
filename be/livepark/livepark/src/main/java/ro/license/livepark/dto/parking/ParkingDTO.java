package ro.license.livepark.dto.parking;

import lombok.Data;
import ro.license.livepark.config.parkingUtils.SensorConfiguration;

@Data
public class ParkingDTO {
    private String name;

    private String address;

    private Double lat;

    private Double lng;

    private String parkingFee;

    private Integer expiration_hours;

    private Integer expiration_minutes;

    private SensorConfiguration sensorConfig;
}
