package ro.license.LivePark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ro.license.LivePark.model.User;
import ro.license.LivePark.request.LoginUserRequest;
import ro.license.LivePark.request.RegisterUserRequest;
import ro.license.LivePark.response.LoginResponse;
import ro.license.LivePark.response.MessageWrapper;
import ro.license.LivePark.service.IUserService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/auth")
@RestController
public class AuthController {

    private final IUserService userService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public AuthController(IUserService userService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/allusers")
    public ResponseEntity<?> allUsers() {
        List<User> all = userService.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping(ControllerConstants.SIGN_IN)
    public ResponseEntity<?> signIn(@RequestBody LoginUserRequest request) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Object principal = authentication.getPrincipal();
//        if (!(principal instanceof))

        return ResponseEntity.ok(
                LoginResponse
                        .builder()
                        .token("") // TODO Lucian continue here
                        .build()
        );
    }

    @PostMapping(ControllerConstants.SIGN_UP)
    public ResponseEntity<?> register(@RequestBody RegisterUserRequest request) {
        List<User> userByUsername = userService.findByUsername(request.getUsername());
        if (!userByUsername.isEmpty())
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message(ControllerConstants.ERROR_DUPLICATE_USERNAME));

        List<User> userByEmail = userService.findByEmail(request.getEmail());
        if (!userByEmail.isEmpty())
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message(ControllerConstants.ERROR_DUPLICATE_EMAIL));

        // TODO Lucian i have to encode the password here

        User user = User
                .builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userService.save(user);

        return ResponseEntity.ok(MessageWrapper.builder().message(ControllerConstants.SUCCESSFULLY_REGISTERED).build());
    }
}
