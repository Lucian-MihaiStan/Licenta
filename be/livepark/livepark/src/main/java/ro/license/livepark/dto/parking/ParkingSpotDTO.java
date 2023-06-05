package ro.license.livepark.dto.parking;

import lombok.Data;
import ro.license.livepark.entities.parking.ParkingSpot;

@Data
public class ParkingSpotDTO {
    private int id;

    private String number;

    private Integer parking_id;

    private ParkingSpot.ParkingSpotStatus status;
}
