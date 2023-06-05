package ro.license.livepark.dto.parking;

import lombok.Data;
import java.util.Date;

@Data
public class ReservationInfoDTO {
    private String parking_name;

    private String parkingSpot_number;

    private Date createdTime;

    private Date expirationTime;
}
