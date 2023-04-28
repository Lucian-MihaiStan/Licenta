package ro.license.livepark.entities.car;

public record CarDTO(
        Long carId,
        Long ownerId,
        String plate,
        String vin,
        CarBrand brand
) {
}