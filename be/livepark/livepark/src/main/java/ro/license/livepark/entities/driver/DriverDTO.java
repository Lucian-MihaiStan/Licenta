package ro.license.livepark.entities.driver;

public record DriverDTO (
        Long driverId,
        String licenseId,
        String identityCardId,
        Gender gender
) {
}
