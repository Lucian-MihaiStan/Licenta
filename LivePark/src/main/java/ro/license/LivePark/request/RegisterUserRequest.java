package ro.license.LivePark.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@Builder
public class RegisterUserRequest {

    @Size(min = 3, max = 50)
    private String username;

    @Size(min = 5, max = 50)
    private String email;

    @Size(min = 6, max = 50)
    private String password;
}
