package ro.license.lucian.stan.livepark.packages.received;

//import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterUserRequestPkg {

//    @Size(min = 3, max = 50)
    private String username;

//    @Size(min = 5, max = 50)
    private String email;

//    @Size(min = 6, max = 50)
    private String password;

//    @Size(min = 3, max = 50)
    private String firstName;

//    @Size(min = 3, max = 50)
    private String lastName;

}
