package ro.license.livepark.dto.parking;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import ro.license.livepark.entities.parking.ParkingSpot;

@Data
public class ParkingSpotDTO {
    private int id;

    private Integer key;

    private String number;

    @JsonProperty("isRotated")
    private boolean isRotated;

    @JsonProperty("isAutoCreated")
    private  boolean isAutoCreated;

    @JsonProperty("isDeleted")
    private boolean isDeleted;

    private Position position;

    private ParkingSpot.ParkingSpotStatus status;

    private String sensorDeviceName;
}
