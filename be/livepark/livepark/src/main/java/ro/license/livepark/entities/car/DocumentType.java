package ro.license.livepark.entities.car;

public enum DocumentType {

    RCA("rca"),
    ITP("itp"),
    CASCO("casco"),
    ROVINIETA("rovinieta");

    private final String type;

    DocumentType(String type) {
        this.type = type;
    }

}
