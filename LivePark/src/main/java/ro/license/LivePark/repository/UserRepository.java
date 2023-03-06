package ro.license.LivePark.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.license.LivePark.entities.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    @Query("SELECT * FROM accounts a WHERE a.user_id = :id_")
    Iterable<UserEntity> findByUserId(@Param("id_") Long id);

    @Query("SELECT * FROM accounts a WHERE a.username = :username_")
    Iterable<UserEntity> findByUserName(@Param("username_") String username);

    @Query("INSERT INTO accounts(username, email, password) VALUES (:username_, :email_, :password_) RETURNING user_id")
    Long saveUser(@Param("username_") String username, @Param("email_") String email, @Param("password_") String password);

}
