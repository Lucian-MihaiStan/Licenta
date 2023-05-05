package ro.license.livepark.http.packages.sent;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRegisterResponsePkg {
    private String token;
    private Long userId;

}
