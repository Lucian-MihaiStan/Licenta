package ro.license.livepark.http.packages.received;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DocumentIdEntityPkg {
    Long entityId;
    String documentType;
    String documentId;
}
