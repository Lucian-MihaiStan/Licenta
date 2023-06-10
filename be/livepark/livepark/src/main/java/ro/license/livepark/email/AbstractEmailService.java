package ro.license.livepark.email;

public interface AbstractEmailService {
    void send(String to, String subject, String text);
}
