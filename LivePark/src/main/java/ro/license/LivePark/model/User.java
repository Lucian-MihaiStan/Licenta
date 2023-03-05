package ro.license.LivePark.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ro.license.LivePark.entities.UserEntity;

@Builder(access = AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
public class User implements IUser {
    private Long userId;
    private String username;
    private String password;

    public static User createUser(UserEntity userEntity) {
        return new UserBuilder()
                .userId(userEntity.getUserId())
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .build();
    }
}
