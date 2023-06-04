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
        String rcaId,
        Date rcaExpirationDate,
        String itpId,
        Date itpExpirationDate,
        String rovinietaId,
        Date rovinietaExpirationDate,
        String cascoId,
        Date cascoExpirationDate,
        Date fireExtinguisherExpirationDate,
        Date firstAidKitExpirationDate
) {
}
