package ro.license.LivePark.controller;

import org.springframework.web.bind.annotation.*;
import ro.license.LivePark.config.ConnectionUtils;
import ro.license.LivePark.model.User;
import ro.license.LivePark.service.IUserService;

import java.net.URISyntaxException;
import java.util.List;

@RequestMapping("api/user")
@RestController
public class UserController {

    private final IUserService userLiveParkService;

    public UserController(IUserService userLiveParkService) {
        this.userLiveParkService = userLiveParkService;
    }


    @GetMapping(path = "/allusers")
    public List<User> getAllUsers() {
        System.out.println("Getting All Users");
        return userLiveParkService.findAll();
    }

    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable Long id) {
        System.out.println("Getting user with id " + id);
        return userLiveParkService.findByUserId(id).get(0);
    }

    @GetMapping(path = "/username/{username}")
    public List<User> getUserByUsername(@PathVariable String username) {
        System.out.println("Getting user with username " + username);
        return userLiveParkService.findByUsername(username);
    }
    @PostMapping(value = "/adduser")
    public Long createUserLiverPark(@RequestBody User user) throws URISyntaxException {
        return userLiveParkService.save(user);
    }

}
