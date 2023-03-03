package ro.license.LivePark.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.license.LivePark.entities.UserLivePark;

@Repository
public interface UserRepository extends CrudRepository<UserLivePark, Long> {

    @Query("SELECT * FROM accounts a WHERE a.id = :id_")
    Iterable<UserLivePark> findByUserId(@Param("id_") Long id);

    @Query("SELECT * FROM accounts a WHERE a.username = :username_")
    Iterable<UserLivePark> findByUserName(@Param("username_") String username);

}
