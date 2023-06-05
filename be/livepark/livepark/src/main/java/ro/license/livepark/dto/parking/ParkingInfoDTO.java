package ro.license.livepark.dto.parking;

import lombok.Data;

@Data
public class ParkingInfoDTO {
    private int id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    private String parkingFee;

    private boolean hasSensors;

    private Integer totalSpots;

    private Integer emptySpots;

    private Long adminId;

}
