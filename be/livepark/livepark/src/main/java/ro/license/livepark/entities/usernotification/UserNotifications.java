package ro.license.livepark.entities.usernotification;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.license.livepark.entities.notification.Notification;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "UserNotification")
@Table(name = "usernotifications")
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name="user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name="notifications", unique = true, nullable = false)
    @OneToMany(mappedBy = "userNotification", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @Column(name = "isRead", nullable = false)
    private Boolean isRead;

    @Column(name = "verbosity", nullable = false)
    private Verbosity verbosity = Verbosity.LOW;

}
