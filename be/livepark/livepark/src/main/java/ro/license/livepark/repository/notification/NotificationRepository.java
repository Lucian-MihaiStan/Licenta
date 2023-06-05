package ro.license.livepark.repository.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.driver.Driver;
import ro.license.livepark.entities.notification.Notification;
import ro.license.livepark.entities.notification.NotificationDTO;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByDriver(Driver driver);
}
