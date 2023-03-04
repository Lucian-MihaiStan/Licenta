package ro.license.LivePark.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.license.LivePark.entities.UserLivePark;
import ro.license.LivePark.repository.UserRepository;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repository;
    @Override
    public Iterable<UserLivePark> findAll() {
        return repository.findAll();
    }

    @Override
    public Iterable<UserLivePark> findByUserId(Long id) {
        return repository.findByUserId(id);
    }

    @Override
    public Iterable<UserLivePark> findByUsername(String username) {
        return repository.findByUserName(username);
    }

    @Override
    public Long save(UserLivePark user) {
        return repository.saveUser(user.getUsername(), user.getPassword());
    }
}
