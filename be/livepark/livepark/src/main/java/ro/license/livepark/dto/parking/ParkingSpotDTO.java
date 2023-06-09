package ro.license.livepark.dto.parking;

import lombok.Data;
import ro.license.livepark.entities.parking.ParkingSpot;

@Data
public class ParkingSpotDTO {
    private int id;

    private Integer key;

    private String number;

    private boolean isRotated;

    private  boolean isAutoCreated;

    private boolean isDeleted;

    private Position position;

    private ParkingSpot.ParkingSpotStatus status;
}
