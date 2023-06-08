package ro.license.livepark.dto.parking;

import lombok.Data;
import java.util.Date;

@Data
public class ReservationDTO {
    private Integer parkingSpot_id;

    private Date createdTime;

    private Date expirationTime;
}
