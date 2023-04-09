package ro.license.livepark.entities.document.postgres.driver;

import ro.license.livepark.entities.document.IDocument;

import java.sql.Date;

public class IdentityCardPostgresSQL implements IDocument {
    @Override
    public Date getPublicationDate() {
        return null;
    }
}
