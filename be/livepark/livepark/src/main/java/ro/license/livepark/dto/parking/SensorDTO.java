package ro.license.livepark.dto.parking;

import lombok.Data;

@Data
public class SensorDTO {
    private Integer parkingSpot_id;

    private String deviceName;
}
