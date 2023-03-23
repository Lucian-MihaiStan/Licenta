package ro.license.lucian.stan.livepark.packages.sent;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRegisterResponsePkg {
    private String token;
    private Long userId;
    private String username;
    private String email;
}
