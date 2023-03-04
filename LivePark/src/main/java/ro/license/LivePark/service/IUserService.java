package ro.license.LivePark.service;

import ro.license.LivePark.entities.IUser;
import ro.license.LivePark.entities.UserLivePark;

public interface IUserService {
    Iterable<UserLivePark> findAll();

    Iterable<UserLivePark> findByUserId(Long id);

    Iterable<UserLivePark> findByUsername(String username);

    IUser save(UserLivePark user);
}
