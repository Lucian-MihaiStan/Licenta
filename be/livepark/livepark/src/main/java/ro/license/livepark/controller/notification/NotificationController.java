package ro.license.livepark.controller.notification;

import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.notification.NotificationDTO;
import ro.license.livepark.service.notification.NotificationService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

}
