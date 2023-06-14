package ro.license.livepark.http.packages.sent;

import lombok.Builder;
import lombok.Data;
import ro.license.livepark.entities.user.UserRole;

@Data
@Builder
public class LoginRegisterResponsePkg {
    private String token;
    private Long userId;
    private UserRole userRole;

}
