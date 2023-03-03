package ro.license.LivePark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.license.LivePark.entities.UserLivePark;
import ro.license.LivePark.service.IUserService;

@RequestMapping("livepark/user")
@RestController
public class UserController {

    @Autowired
    private IUserService userLiveParkService;


    @GetMapping(path = "/allusers")
    public Iterable<UserLivePark> getAllUsers() {
        return userLiveParkService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Iterable<UserLivePark> getUserById(@PathVariable Long id) {
        System.out.println("Get User by ID: " + id);
        return userLiveParkService.findByUserId(id);
    }

    @GetMapping(path = "/username/{username}")
    public Iterable<UserLivePark> getUserByUsername(@PathVariable String username) {
        System.out.println("Get User by username: " + username);
        return userLiveParkService.findByUsername(username);
    }

}
