package ro.license.lucian.stan.livepark.entities.document.postgres.driver;

import ro.license.lucian.stan.livepark.entities.document.IDocument;

import java.sql.Date;

public class IdentityCardPostgresSQL implements IDocument {
    @Override
    public Date getPublicationDate() {
        return null;
    }
}
