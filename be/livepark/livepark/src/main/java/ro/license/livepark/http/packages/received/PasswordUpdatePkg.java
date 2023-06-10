package ro.license.livepark.http.packages.received;

import lombok.Data;

@Data
public class PasswordUpdatePkg {
    private String username;
    private String newPassword;
}
