package ro.license.LivePark.service.user;

import ro.license.LivePark.model.user.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();

    List<User> findByUserId(Long id);

    List<User> findByUsername(String username);

    Long save(User user);

    List<User> findByEmail(String email);
}
