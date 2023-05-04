package ro.license.livepark.controller.login;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.license.livepark.http.packages.sent.LoginRegisterResponsePkg;
import ro.license.livepark.http.packages.sent.MessageWrapper;
import ro.license.livepark.auth.JWToken;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;
import ro.license.livepark.service.user.UserService;

@Service
public class LoginRegisterService {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final JWToken tokenizer;

    public LoginRegisterService(UserService userService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JWToken tokenizer) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenizer = tokenizer;
    }

    public ResponseEntity<?> signIn(LoginUserRequestPkg requestPkg) {
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
                        .build()
        );
    }

    public ResponseEntity<?> signUp(RegisterUserRequestPkg requestPkg) {
        // TODO Lucian comment out this
//        if (!(EmailValidator.getInstance().isValid(requestPkg.getEmail())))
//            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Email is not valid!").build());

        UserDTO userFound = userService.findByUsername(requestPkg.getUsername());
        if (userFound != null)
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Username already exists").build());

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
