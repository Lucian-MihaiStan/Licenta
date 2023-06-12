package ro.license.livepark.service.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.entities.user.UserDTOMapper;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.repository.user.UserRepository;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final UserDTOMapper userDTOMapper;

    public UserService(UserRepository userRepository, UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public UserDTO findByUsername(String username) {
        return userDTOMapper.apply(userRepository.findByUsername(username).orElse(null));
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public UserDTO getUserInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return userDTOMapper.apply(user);
    }

    public List<UserDTO> getAllUsersInfo() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userDTOMapper).toList();
    }

    public boolean modifyUserRole(Long userId, UserRole role) {
        if (userRepository.findById(userId).isEmpty() || role == UserRole.MASTER)
            return false;
        User user = userRepository.findById(userId).get();
        user.setRole(role);
        userRepository.save(user);
        return true;
    }

    public User getAuthenticatedUser() {
        return  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
