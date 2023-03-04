package ro.license.LivePark.service;

import ro.license.LivePark.entities.UserLivePark;

public interface IUserService {
    Iterable<UserLivePark> findAll();

    Iterable<UserLivePark> findByUserId(Long id);

    Iterable<UserLivePark> findByUsername(String username);

    Long save(UserLivePark user);
}
