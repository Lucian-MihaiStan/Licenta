package ro.license.livepark.packages.received;

import lombok.Data;

@Data
public class AddCarRequestPkg {
    private String ownerId;
    private String plate;
    private String vin;
    private String brand;
    private String model;
    private String fabricationDate;
    private String insuranceId;
    private String inspectionId;

}
