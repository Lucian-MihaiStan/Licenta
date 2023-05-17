package ro.license.livepark.entities.car;

import java.util.Date;

public record CarDTO(
        Long carId,
        Long ownerId,
        String plate,
        String vin,
        CarBrand brand,
        String model,
        Date fabricationDate,
        String insuranceId,
        String inspectionId,
        String rovinieteId,
        String cascoId,
        Date fireExtinguisherExpirationDate,
        Date firstAidKitExpirationDate
) {
}
