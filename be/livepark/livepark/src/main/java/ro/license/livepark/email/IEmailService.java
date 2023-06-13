package ro.license.livepark.email;

public interface IEmailService {
    void send(String to, String subject, String text);
}
