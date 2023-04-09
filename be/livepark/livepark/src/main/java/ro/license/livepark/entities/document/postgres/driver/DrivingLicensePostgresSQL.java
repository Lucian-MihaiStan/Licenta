package ro.license.livepark.entities.document.postgres.driver;

import ro.license.livepark.entities.document.IDocument;

import java.sql.Date;

public class DrivingLicensePostgresSQL implements IDocument {
    @Override
    public Date getPublicationDate() {
        return null;
    }
}
