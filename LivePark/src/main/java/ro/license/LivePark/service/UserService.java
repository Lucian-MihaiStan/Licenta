package ro.license.LivePark.service;

import org.springframework.stereotype.Service;
import ro.license.LivePark.entities.UserEntity;
import ro.license.LivePark.model.User;
import ro.license.LivePark.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findAll() {
        return collectUsers(repository.findAll());
    }

    @Override
    public List<User> findByUserId(Long id) {
        return collectUsers(repository.findByUserId(id));
    }

    private List<User> collectUsers(Iterable<UserEntity> userEntities) {
        List<User> users = new ArrayList<>();
        userEntities.forEach(userEntity -> users.add(User.createUser(userEntity)));
        return users;
    }

    @Override
    public List<User> findByUsername(String username) {
        return collectUsers(repository.findByUserName(username));
    }

    @Override
    public Long save(User user) {
        return repository.saveUser(user.getUsername(), user.getPassword());
    }
}
