package ro.license.livepark.controller.login;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.controller.constants.LoginRegisterControllerConstants;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class LoginRegisterController {

    private final LoginRegisterService loginRegisterService;

    @PostMapping(LoginRegisterControllerConstants.SIGN_IN)
    public ResponseEntity<?> signIn(@RequestBody LoginUserRequestPkg requestPkg) {
        return loginRegisterService.signIn(requestPkg);
    }

    @PostMapping(LoginRegisterControllerConstants.SIGN_UP)
    public ResponseEntity<?> register(@RequestBody RegisterUserRequestPkg requestPkg) {
        return loginRegisterService.signUp(requestPkg);
    }

    @GetMapping(LoginRegisterControllerConstants.VALIDATE_EMAIL)
        public ResponseEntity<?> validateEmail(@RequestParam("token") String token) {
        return loginRegisterService.validateEmail(token);
    }

    @PostMapping(LoginRegisterControllerConstants.FORGOT_PASSWORD)
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        return loginRegisterService.forgotPassword(email);
    }

    @PostMapping(LoginRegisterControllerConstants.RESET_PASSWORD)
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestParam("email") String email, @RequestParam("password") String password) {
        return loginRegisterService.resetPassword(token, email, password);
    }

}
