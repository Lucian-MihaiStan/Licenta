package ro.license.livepark.dto.parking;

import lombok.Data;
import ro.license.livepark.entities.parking.Reservation;

import java.util.Date;

@Data
public class ReservationInfoDTO {
    private int id;

    private String parking_name;

    private String parking_address;

    private String parkingSpot_number;

    private String carPlate;

    private Date createdTime;

    private Date expirationTime;

    public ReservationInfoDTO(Reservation r) {
        id = r.getId();
        parking_name = r.getParkingSpot().getParking().getName();
        parking_address = r.getParkingSpot().getParking().getAddress();
        parkingSpot_number = r.getParkingSpot().getNumber();
        carPlate = r.getCarPlate();
        expirationTime = r.getExpirationTime();
        createdTime = r.getCreatedTime();
    }
}
