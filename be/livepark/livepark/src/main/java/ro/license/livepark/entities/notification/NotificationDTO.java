package ro.license.livepark.entities.notification;

import java.sql.Date;

public record NotificationDTO (
    Long id,
    String title,
    String message,
    Date createdAt
) {

}
