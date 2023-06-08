package ro.license.livepark.controller.support;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ro.license.livepark.jobs.EmailService;

@Service
@RequiredArgsConstructor
public class SupportEmailService implements EmailService {

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
