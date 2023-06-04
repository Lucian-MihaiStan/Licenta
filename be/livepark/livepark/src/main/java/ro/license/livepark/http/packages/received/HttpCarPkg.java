package ro.license.livepark.http.packages.received;

import lombok.Data;

@Data
public class HttpCarPkg {
    private String ownerId;
    private String plate;
    private String vin;
    private String brand;
    private String model;
    private String fabricationDate;

}
