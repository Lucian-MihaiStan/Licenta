package ro.license.livepark.http.packages.received;

import lombok.Data;

@Data
public class LoginUserRequestPkg {
    private String username;

    private String password;
}
