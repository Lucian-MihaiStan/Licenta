package ro.license.livepark.http.packages.received;

import lombok.Data;

@Data
public class DocumentIdEntityPkg {
    Long entityId;
    String documentType;
    String documentId;
}
