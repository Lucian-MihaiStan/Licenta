package ro.license.LivePark.entities;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;


@Entity
@Table(name="accounts")
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
public class UserLivePark implements IUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique = true, nullable = false)
    public Long id;

    @Column(name = "username", length = 50)
    public String username;

    @Column(name = "password", length = 50)
    public String password;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
