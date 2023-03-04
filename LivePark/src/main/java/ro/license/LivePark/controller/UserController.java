package ro.license.LivePark.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.LivePark.entities.IUser;
import ro.license.LivePark.entities.UserLivePark;
import ro.license.LivePark.service.IUserService;

import java.net.URI;
import java.net.URISyntaxException;

@RequestMapping("api/user")
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
        return userLiveParkService.findByUserId(id);
    }

    @GetMapping(path = "/username/{username}")
    public Iterable<UserLivePark> getUserByUsername(@PathVariable String username) {
        return userLiveParkService.findByUsername(username);
    }

    @PostMapping
    public ResponseEntity<?> createUserLiverPark(@RequestBody UserLivePark user) throws URISyntaxException {
        IUser userLivePark = userLiveParkService.save(user);
        if (!(userLivePark instanceof UserLivePark))
            return null;

        return ResponseEntity.created(new URI("api/user" + ((UserLivePark) userLivePark).getId())).body(userLivePark);
    }

}
