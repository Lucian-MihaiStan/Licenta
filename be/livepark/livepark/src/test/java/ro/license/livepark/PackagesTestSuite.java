package ro.license.livepark;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import ro.license.livepark.http.packages.received.*;

@SpringBootTest
public class PackagesTestSuite {

    @Test
    public void carIdDocumentExpirationTest() {
        CarIdDocumentExpiration pck = new CarIdDocumentExpiration();
        pck.setCarId(1L);
        pck.setDocumentType("ITP");
        pck.setDocumentExpirationDate(new java.sql.Date(2020, 12, 12));

        assert(pck.getCarId() == 1L);
        assert(pck.getDocumentType().equals("ITP"));
        assert(pck.getDocumentExpirationDate().equals(new java.sql.Date(2020, 12, 12)));
    }

    @Test
    public void carIdEquipmentTest() {
        CarIdEquipment pck = new CarIdEquipment();
        pck.setCarId(1L);
        pck.setEquipmentType("FireExtinguisher");
        pck.setEquipmentExpirationDate(new java.sql.Date(2020, 12, 12));

        assert(pck.getCarId() == 1L);
        assert(pck.getEquipmentType().equals("FireExtinguisher"));
        assert(pck.getEquipmentExpirationDate().equals(new java.sql.Date(2020, 12, 12)));
    }

    @Test
    public void documentIdEntityPkg() {
        DocumentIdEntityPkg pck = new DocumentIdEntityPkg();
        pck.setEntityId(1L);
        pck.setDocumentType("CI");
        pck.setDocumentId("123456789");

        assert(pck.getEntityId() == 1L);
        assert(pck.getDocumentType().equals("CI"));
        assert(pck.getDocumentId().equals("123456789"));
    }

    @Test
    public void httpPackagesTest() {
        HttpCarPkg pck = new HttpCarPkg();

        pck.setOwnerId("1");
        pck.setPlate("B-01-ABC");
        pck.setVin("123456789");
        pck.setBrand("Audi");
        pck.setModel("A4");
        pck.setFabricationDate("2020-12-12");

        assert(pck.getOwnerId().equals("1"));
        assert(pck.getPlate().equals("B-01-ABC"));
        assert(pck.getVin().equals("123456789"));
        assert(pck.getBrand().equals("Audi"));
        assert(pck.getModel().equals("A4"));
        assert(pck.getFabricationDate().equals("2020-12-12"));
    }

    @Test
    public void loginUserRequestPkgTest() {
        LoginUserRequestPkg pck = LoginUserRequestPkg.builder().username("username").password("password").build();

        assert(pck.getUsername().equals("username"));
        assert(pck.getPassword().equals("password"));
    }

    @Test
    public void passwordUpdatePkgTest() {
        PasswordUpdatePkg pck = new PasswordUpdatePkg();
        pck.setUsername("username");
        pck.setNewPassword("newPassword");

        assert(pck.getUsername().equals("username"));
        assert(pck.getNewPassword().equals("newPassword"));
    }

    @Test
    public void registerUserRequestPkgTest() {
        RegisterUserRequestPkg pck = RegisterUserRequestPkg
                .builder()
                .username("username")
                .email("email")
                .password("password")
                .firstName("firstName")
                .lastName("lastName")
                .build();

        assert(pck.getUsername().equals("username"));
        assert(pck.getEmail().equals("email"));
        assert(pck.getPassword().equals("password"));
        assert(pck.getFirstName().equals("firstName"));
        assert(pck.getLastName().equals("lastName"));
    }

    @Test
    public void sendEmailPkgTest() {
        SendMailPkg pck = new SendMailPkg();
        pck.setFirstName("firstName");
        pck.setLastName("lastName");
        pck.setEmail("email");
        pck.setSubject("subject");
        pck.setMessage("message");

        assert(pck.getFirstName().equals("firstName"));
        assert(pck.getLastName().equals("lastName"));
        assert(pck.getEmail().equals("email"));
        assert(pck.getSubject().equals("subject"));
        assert(pck.getMessage().equals("message"));
    }

}
