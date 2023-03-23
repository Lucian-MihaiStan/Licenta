package ro.license.LivePark.service.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.license.LivePark.entities.user.UserEntity;
import ro.license.LivePark.model.user.User;
import ro.license.LivePark.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService, IUserService {

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

    @Override
    public List<User> findByUsername(String username) {
        return collectUsers(repository.findByUsername(username));
    }

    private List<User> collectUsers(Iterable<UserEntity> userEntities) {
        List<User> users = new ArrayList<>();
        userEntities.forEach(userEntity -> users.add(
                User.builder()
                        .userId(userEntity.getUserId())
                        .username(userEntity.getUsername())
                        .firstname(userEntity.getFirstname())
                        .lastname(userEntity.getLastname())
                        .email(userEntity.getEmail())
                        .password(userEntity.getPassword())
                        .build())
        );
        return users;
    }

    @Override
    public Long save(User user) {
        return repository.saveUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getFirstname(), user.getLastname());
    }

    @Override
    public List<User> findByEmail(String email) {
        return collectUsers(repository.findByEmail(email));
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> user = findByUsername(username);
        if (user.isEmpty())
            throw new UsernameNotFoundException("User Not Found with username: " + username);

        if (user.size() != 1)
            throw new IllegalStateException("Found multiple users with the same username :" + username);

        return user.get(0);
    }
}
