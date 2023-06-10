package ro.license.livepark.controller.notification;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.notification.NotificationDTO;
import ro.license.livepark.service.notification.NotificationService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/notifications")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/notification")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(notificationService.findByUserId(userId));
    }

}
