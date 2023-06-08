package ro.license.livepark.http.packages.received;

import lombok.Data;

@Data
public class SendMailPkg {
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String message;
}
