package ro.license.livepark.controller.user;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.service.user.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        User user = userService.getAuthenticatedUser();
        if (user.getRole() != UserRole.MASTER)
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        List<UserDTO> users = userService.getAllUsersInfo();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> modifyUserRole(@RequestParam Long id, @RequestParam UserRole role) {
        User user = userService.getAuthenticatedUser();
        if (user.getRole() != UserRole.MASTER)
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        if (userService.modifyUserRole(id, role))
            return new ResponseEntity<>(null, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

}
