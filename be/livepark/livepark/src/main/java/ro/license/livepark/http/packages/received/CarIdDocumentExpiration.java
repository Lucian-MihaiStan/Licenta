package ro.license.livepark.http.packages.received;

import lombok.Data;

import java.sql.Date;

@Data
public class CarIdDocumentExpiration {

    Long carId;
    String documentType;
    Date documentExpirationDate;

}
