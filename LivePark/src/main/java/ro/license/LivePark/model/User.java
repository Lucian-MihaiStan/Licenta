package ro.license.LivePark.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ro.license.LivePark.entities.UserEntity;

@Builder
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
public class User implements IUser {
    private Long userId;
    private String username;
    private String email;
    private String password;
}
