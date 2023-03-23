package ro.license.LivePark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.license.LivePark.model.User;
import ro.license.LivePark.service.IUserService;
import ro.license.LivePark.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class HelloWorldController {

    @Autowired
    private UserService userService;

    @RequestMapping({ "/hello" })
    public String hello() {
        return "Hello World";
    }


    @RequestMapping("/allusers")
    public ResponseEntity<?> allUsers() {
        List<User> all = userService.findAll();
        return ResponseEntity.ok(all);
    }
}
