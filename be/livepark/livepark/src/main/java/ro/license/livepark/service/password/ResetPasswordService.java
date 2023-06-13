package ro.license.livepark.service.password;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.license.livepark.email.ResetPasswordEmailService;
import ro.license.livepark.entities.password.ResetPassword;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.repository.password.ResetPasswordRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {

    private final ResetPasswordRepository resetPasswordRepository;

    private final ResetPasswordEmailService resetPasswordEmailService;

    public void save(ResetPassword resetPassword) {
        resetPasswordRepository.save(resetPassword);
    }

    public void createResetPasswordLink(User user) {

        String token = UUID.randomUUID().toString();

        ResetPassword resetPassword = ResetPassword.builder()
                .user(user)
                .expirationToken(token)
                .expirationDate(ResetPassword.computeExpirationDate())
                .build();

        String content = "Dear [[name]],<br>\n"
                + "Please click the link below to change your password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_blank\">RESET PASSWORD</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        content = content.replace("[[name]]", user.getFullName());
        content = content.replace("[[URL]]", "http://localhost:3000/resetpassword?token=" + token + "&email=" + user.getEmail());

        resetPasswordEmailService.send(
                user.getEmail(),
                "Reset password",
                "Click on the link below to reset your password:\n\n" +
                content
        );

        resetPasswordRepository.save(resetPassword);
    }

    public ResetPassword findByToken(String token) {
        return resetPasswordRepository.findByExpirationToken(token).orElse(null);
    }

    public void delete(ResetPassword resetPassword) {
        resetPasswordRepository.delete(resetPassword);
    }
}
