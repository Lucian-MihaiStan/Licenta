package ro.license.livepark.entities.notification;

import java.util.function.Function;

public class NotificationDTOMapper implements Function<Notification, NotificationDTO> {
    @Override
    public NotificationDTO apply(Notification notification) {
        if (notification == null)
            return null;

        return new NotificationDTO(
            notification.getId(),
            notification.getTitle(),
            notification.getMessage(),
            notification.getCreatedAt().toString(),
            notification.getUpdatedAt().toString(),
            notification.getIsClosed()
        );
    }
}
