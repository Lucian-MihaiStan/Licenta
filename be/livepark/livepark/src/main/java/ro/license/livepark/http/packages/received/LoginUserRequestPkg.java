package ro.license.livepark.http.packages.received;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginUserRequestPkg {
    private String username;

    private String password;
}
