package ro.license.lucian.stan.livepark.controller.login;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.lucian.stan.livepark.controller.constants.LoginRegisterControllerConstants;
import ro.license.lucian.stan.livepark.packages.received.LoginUserRequestPkg;
import ro.license.lucian.stan.livepark.packages.received.RegisterUserRequestPkg;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/auth")
@RestController
public class LoginRegisterController {

    private final LoginRegisterService loginRegisterService;

    public LoginRegisterController(LoginRegisterService loginRegisterService) {
        this.loginRegisterService = loginRegisterService;
    }

    @PostMapping(LoginRegisterControllerConstants.SIGN_IN)
    public ResponseEntity<?> signIn(@RequestBody LoginUserRequestPkg requestPkg) {
        return loginRegisterService.signIn(requestPkg);
    }

    @PostMapping(LoginRegisterControllerConstants.SIGN_UP)
    public ResponseEntity<?> register(@RequestBody RegisterUserRequestPkg requestPkg) {
        return loginRegisterService.signUp(requestPkg);
    }

}
