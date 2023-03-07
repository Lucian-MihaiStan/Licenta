package ro.license.LivePark.model;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.license.LivePark.service.UserService;

import java.util.List;

@Service
public class UserModelService implements UserDetailsService {

    private final UserService userService;

    public UserModelService(UserService userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> byUsername = userService.findByUsername(username);
        if (byUsername.isEmpty())
            throw new UsernameNotFoundException("User not found with username: " + username);

        if (byUsername.size() != 1)
            throw new IllegalStateException("Found multiple users in database with same username: " + username);

        return byUsername.get(0);
    }
}
