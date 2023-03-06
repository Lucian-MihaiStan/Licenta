package ro.license.LivePark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.license.LivePark.config.ConnectionUtils;
import ro.license.LivePark.model.User;
import ro.license.LivePark.request.LoginRequest;
import ro.license.LivePark.request.RegisterUserRequest;
import ro.license.LivePark.response.LoginResponse;
import ro.license.LivePark.response.MessageWrapper;
import ro.license.LivePark.service.IUserService;

import java.util.List;

@CrossOrigin(value = ConnectionUtils.FH_LOCAL_3000_URL, maxAge = 6000)
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final IUserService userService;

    private final AuthenticationManager authenticationManager;

    public AuthController(IUserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(ControllerConstants.SIGN_IN)
    public ResponseEntity<?> signIn(@RequestBody LoginRequest request) {

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
                .password(request.getPassword())
                .build();

        userService.save(user);

        return ResponseEntity.ok(MessageWrapper.builder().message(ControllerConstants.SUCCESSFULLY_REGISTERED).build());
    }
}
