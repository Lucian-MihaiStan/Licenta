package ro.license.livepark.service.notification;

import org.springframework.stereotype.Service;
import ro.license.livepark.repository.notification.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
}
