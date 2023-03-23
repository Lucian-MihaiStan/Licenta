package ro.license.LivePark.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class DashboardController {

    @RequestMapping({ "/hello" })
    public String hello() {
        return "Hello World";
    }

}
