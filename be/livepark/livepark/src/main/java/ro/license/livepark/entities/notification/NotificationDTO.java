package ro.license.livepark.entities.notification;

public record NotificationDTO (
    Long id,
    String title,
    String message,
    String createdAt,
    String updatedAt,
    Boolean isClosed
) {

}
