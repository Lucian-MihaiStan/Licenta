package ro.license.LivePark.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.license.LivePark.entities.IUser;
import ro.license.LivePark.entities.UserLivePark;

@Repository
public interface UserRepository extends CrudRepository<UserLivePark, Long> {

    @Query("SELECT * FROM accounts a WHERE a.user_id = :id_")
    Iterable<UserLivePark> findByUserId(@Param("id_") Long id);

    @Query("SELECT * FROM accounts a WHERE a.username = :username_")
    Iterable<UserLivePark> findByUserName(@Param("username_") String username);

    @Query("INSERT INTO accounts(username, password) VALUES (:username_, :password_) RETURNING user_id")
    Long saveUser(@Param("username_") String username, @Param("password_") String password);

}
