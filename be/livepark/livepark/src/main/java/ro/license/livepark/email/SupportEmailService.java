package ro.license.livepark.email;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupportEmailService implements AbstractEmailService {

    private final JavaMailSender mailSender;

    @SneakyThrows
    @Async
    @Override
    public void send(String from, String subject, String text) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(message);

        helper.setFrom(from);
        helper.setTo("livepark08@gmail.com");
        helper.setSubject(subject);
        helper.setText(text, true);

        mailSender.send(message);
    }
}
