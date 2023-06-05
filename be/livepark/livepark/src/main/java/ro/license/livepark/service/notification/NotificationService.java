package ro.license.livepark.service.notification;

import org.springframework.stereotype.Service;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.notification.NotificationDTO;
import ro.license.livepark.entities.notification.NotificationDTOMapper;
import ro.license.livepark.repository.notification.NotificationRepository;
import ro.license.livepark.service.driver.DriverService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final DriverService driverService;
    private final NotificationDTOMapper notificationDTOMapper;

    public NotificationService(NotificationRepository notificationRepository, DriverService driverService, NotificationDTOMapper notificationDTOMapper) {
        this.notificationRepository = notificationRepository;
        this.driverService = driverService;
        this.notificationDTOMapper = notificationDTOMapper;
    }

    public void save(Notification notification) {
        notificationRepository.save(notification);
    }

    public List<NotificationDTO> findByUserId(Long userId) {
        return notificationRepository.findByDriver(driverService.findDriverByUserId(userId)).stream().map(notificationDTOMapper).collect(Collectors.toList());
    }
}
