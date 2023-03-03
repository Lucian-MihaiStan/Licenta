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
public class UserLivePark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    public Long id;

    @Column(table = "accounts", name = "username")
    public String username;

    @Column(table = "accounts", name="password")
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
