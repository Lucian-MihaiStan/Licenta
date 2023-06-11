package ro.license.livepark.entities.password;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import ro.license.livepark.entities.user.User;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ResetPassword")
@Table(name = "reset_password")
public class ResetPassword {

    @Value("${live.park.app.resetPasswordTokenExpirationMs}")
    private static int RESET_EXPIRATION_TIME;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expiration_token", nullable = false)
    private String expirationToken;

    @Column("expiration_date")
    private Date expirationDate;

    public static Date computeExpirationDate() {
        return new Date((new java.util.Date()).getTime() + RESET_EXPIRATION_TIME);
    }
}
