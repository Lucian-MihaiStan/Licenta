package ro.license.livepark.entities.notification;

public enum Verbosity {
    LOW ("In the next 20 days"),
    MEDIUM ("In the next 10 days"),
    HIGH ("In the next few days");

    private final String text;

    Verbosity(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
