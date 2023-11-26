package ro.license.livepark;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.http.packages.received.CarIdDocumentExpiration;

@SpringBootTest
public class DTOTestSuite {

    @Test
    public void userDTOTest() {
        UserDTO userDTO = new UserDTO(
                1L,
                "username",
                "email",
                "firstName",
                "lastName",
                null
        );

        assert(userDTO.userId() == 1L);
        assert(userDTO.username().equals("username"));
        assert(userDTO.email().equals("email"));
        assert(userDTO.firstName().equals("firstName"));
        assert(userDTO.lastName().equals("lastName"));
        assert(userDTO.role() == null);
    }

}
