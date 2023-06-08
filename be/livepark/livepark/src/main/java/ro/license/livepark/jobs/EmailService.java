package ro.license.livepark.jobs;

public interface EmailService {
    void send(String to, String subject, String text);

}
