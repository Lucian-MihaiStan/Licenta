package ro.license.livepark.controller.login;

import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.license.livepark.email.ValidationEmailService;
import ro.license.livepark.entities.password.ResetPassword;
import ro.license.livepark.http.packages.sent.LoginRegisterResponsePkg;
import ro.license.livepark.http.packages.sent.MessageWrapper;
import ro.license.livepark.auth.JWToken;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.entities.user.UserRole;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;
import ro.license.livepark.service.password.ResetPasswordService;
import ro.license.livepark.service.user.UserService;

import java.sql.Date;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class LoginRegisterService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JWToken tokenizer;
    private final ValidationEmailService validationEmailService;
    private final ResetPasswordService resetPasswordService;

    public ResponseEntity<?> signIn(LoginUserRequestPkg requestPkg) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(requestPkg.getUsername(), requestPkg.getPassword());

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User user))
            throw new IllegalStateException("Unknown element " + principal);

        if (!user.getEnabled())
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Email not verified!").build());

        return ResponseEntity.ok(
                LoginRegisterResponsePkg
                        .builder()
                        .token((tokenizer.generateJwtToken(authentication)))
                        .userId(user.getUserId())
                        .build()
        );
    }

    public ResponseEntity<?> signUp(RegisterUserRequestPkg requestPkg) {
        String email = requestPkg.getEmail();
        if (!(EmailValidator.getInstance().isValid(email)))
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Email is not valid!").build());

        UserDTO userFound = userService.findByUsername(requestPkg.getUsername());
        if (userFound != null)
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Username already exists").build());

        User user = User
                .builder()
                .username(requestPkg.getUsername())
                .password(passwordEncoder.encode(requestPkg.getPassword()))
                .email(email)
                .firstName(requestPkg.getFirstName())
                .lastName(requestPkg.getLastName())
                .role(UserRole.USER)
                .build();

        userService.save(user);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(requestPkg.getUsername(), requestPkg.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User))
            throw new IllegalStateException("Unknown element " + principal);

        String content = "Dear [[name]],<br>\n"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_blank\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        content = content.replace("[[name]]", user.getFullName());
        content = content.replace("[[URL]]", "http://localhost:3000/validation/?token=" + tokenizer.generateJwtToken(authentication));

        String subject = "Please verify your registration on LivePark";
        validationEmailService.send(
                email,
                subject,
                content
        );

        return ResponseEntity.ok(MessageWrapper.builder().message("Successfully register!").build());
    }

    public ResponseEntity<?> validateEmail(String token) {
        if (token == null || token.isEmpty())
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Token is empty!").build());

        String username = tokenizer.getUserNameFromJwtToken(token);
        if (username == null || username.isEmpty())
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Username is empty!").build());

        userService.validateEmail(username);

        return ResponseEntity.ok(MessageWrapper.builder().message("Successfully validated!").build());
    }

    public ResponseEntity<?> forgotPassword(String email) {
        User user = userService.findByEmail(email);
        if (user == null)
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Email not found!").build());

        resetPasswordService.createResetPasswordLink(user);

        return ResponseEntity.ok(MessageWrapper.builder().message("An email had been sent validated!").build());
    }

    public ResponseEntity<?> resetPassword(String token, String email, String password) {
        User user = userService.findByEmail(email);
        if (user == null)
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Email not found!").build());

//        if (!Pattern.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", password))
        ResetPassword resetPassword = resetPasswordService.findByToken(token);
        if (resetPassword == null)
            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Token not found!").build());

        // TODO Lucian - check if token expired
//        if (resetPassword.getExpirationDate().compareTo(new Date(System.currentTimeMillis())) < 0)
//            return ResponseEntity.badRequest().body(MessageWrapper.builder().message("Token expired!").build());

        resetPasswordService.delete(resetPassword);
        userService.resetPassword(user, passwordEncoder.encode(password));

        return ResponseEntity.ok(MessageWrapper.builder().message("Password reset successfully!").build());
    }
}
