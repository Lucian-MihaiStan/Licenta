package ro.license.LivePark.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@Builder
public class LoginResponse {

    private String token;
    private Long userId;
    private String username;
    private String email;

}
