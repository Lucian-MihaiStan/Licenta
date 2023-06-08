package ro.license.livepark.controller.user;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.service.user.UserService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/hasFullAuthority")
    public boolean userIsMaster(@RequestParam("userId") Long userId) {
        return userService.hasRole(userId, UserRole.MASTER);
    }

    @GetMapping("/hasAdminAuthority")
    public boolean userIsAdmin(@RequestParam("userId") Long userId) {
        return userService.hasRole(userId, UserRole.ADMIN) || userService.hasRole(userId, UserRole.MASTER);
    }

}
