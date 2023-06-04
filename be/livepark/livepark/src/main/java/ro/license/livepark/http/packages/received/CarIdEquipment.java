package ro.license.livepark.http.packages.received;

import lombok.Data;

import java.sql.Date;

@Data
public class CarIdEquipment {
    private Long carId;
    private String equipmentType;
    private Date equipmentExpirationDate;
}
