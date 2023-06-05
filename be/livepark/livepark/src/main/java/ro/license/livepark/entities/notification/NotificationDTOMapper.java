package ro.license.livepark.entities.notification;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class NotificationDTOMapper implements Function<Notification, NotificationDTO> {
    @Override
    public NotificationDTO apply(Notification notification) {
        if (notification == null)
            return null;

        return new NotificationDTO(
            notification.getId(),
            notification.getTitle(),
            notification.getMessage(),
            notification.getCreatedAt()
        );
    }
}
