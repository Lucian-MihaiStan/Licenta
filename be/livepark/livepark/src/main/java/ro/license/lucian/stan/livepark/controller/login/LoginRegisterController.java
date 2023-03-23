package ro.license.lucian.stan.livepark.controller.login;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ro.license.lucian.stan.livepark.auth.JWToken;
import ro.license.lucian.stan.livepark.controller.constants.LoginRegisterControllerConstants;
import ro.license.lucian.stan.livepark.entities.user.User;
import ro.license.lucian.stan.livepark.entities.user.UserRole;
import ro.license.lucian.stan.livepark.packages.received.LoginUserRequestPkg;
import ro.license.lucian.stan.livepark.packages.received.RegisterUserRequestPkg;
import ro.license.lucian.stan.livepark.packages.sent.LoginRegisterResponsePkg;
import ro.license.lucian.stan.livepark.packages.sent.MessageWrapper;
import ro.license.lucian.stan.livepark.service.user.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/auth")
@RestController
public class LoginRegisterController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final JWToken tokenizer;

    public LoginRegisterController(UserService userService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JWToken tokenizer) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenizer = tokenizer;
    }

    @PostMapping(LoginRegisterControllerConstants.SIGN_IN)
    public ResponseEntity<?> signIn(@RequestBody LoginUserRequestPkg requestPkg) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(requestPkg.getUsername(), requestPkg.getPassword());

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User user))
            throw new IllegalStateException("Unknown element " + principal);

        return ResponseEntity.ok(
                LoginRegisterResponsePkg
                        .builder()
                        .token((tokenizer.generateJwtToken(authentication)))
                        .userId(user.getUserId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .build()
        );
    }

    @PostMapping(LoginRegisterControllerConstants.SIGN_UP)
    public ResponseEntity<?> register(@RequestBody RegisterUserRequestPkg requestPkg) {
        User userFound = userService.findByUsername(requestPkg.getUsername());
        if (userFound != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = User
                .builder()
                .username(requestPkg.getUsername())
                .password(passwordEncoder.encode(requestPkg.getPassword()))
                .email(requestPkg.getEmail())
                .firstName(requestPkg.getFirstName())
                .lastName(requestPkg.getLastName())
                .role(UserRole.USER)
                .build();

        userService.save(user);

        return ResponseEntity.ok(MessageWrapper.builder().message("Successfully register!").build());
    }


}
