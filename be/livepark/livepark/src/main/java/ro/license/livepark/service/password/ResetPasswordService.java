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

        resetPasswordEmailService.send();

        resetPasswordRepository.save(resetPassword);
    }
}
