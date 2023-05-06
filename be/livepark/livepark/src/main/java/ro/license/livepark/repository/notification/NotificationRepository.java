package ro.license.livepark.repository.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.license.livepark.entities.notification.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
