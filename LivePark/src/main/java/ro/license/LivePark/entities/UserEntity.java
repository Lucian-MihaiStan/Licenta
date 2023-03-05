package ro.license.LivePark.entities;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;


@Entity
@Table(name="accounts")
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Builder
public class UserEntity implements IUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 50)
    private String password;

    @Override
    public String toString() {
        return "User{" +
                "id=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
