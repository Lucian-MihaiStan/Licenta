package ro.license.livepark.http.packages.received;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PasswordUpdatePkg {
    private String username;
    private String newPassword;
}
