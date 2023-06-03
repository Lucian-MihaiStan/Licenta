package ro.license.livepark.dto.parking;

import lombok.Data;

@Data
public class ParkingDTO {
    private String name;

    private String address;

    private String mapsLink;

    private String parkingFee;

    private Integer EXPIRATION_HOURS;

    private Integer EXPIRATION_MINUTES;
}
