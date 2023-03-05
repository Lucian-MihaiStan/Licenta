package ro.license.LivePark.service;

import ro.license.LivePark.model.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();

    List<User> findByUserId(Long id);

    List<User> findByUsername(String username);

    Long save(User user);
}
