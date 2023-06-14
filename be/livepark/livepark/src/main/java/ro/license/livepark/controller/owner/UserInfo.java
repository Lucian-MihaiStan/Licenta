package ro.license.livepark.controller.owner;

import lombok.Builder;
import lombok.Data;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.driver.Gender;
import ro.license.livepark.entities.user.User;
import ro.license.livepark.entities.user.UserDTO;
import ro.license.livepark.entities.user.UserRole;

import java.sql.Driver;
import java.util.Map;

@Data
@Builder
public class UserInfo {

    public static final String USER_DTO = "userDTO";
    public static final String DRIVER_DTO = "driverDTO";
    private UserDTO userDTO;

    private static final UserDTO DUMMY_USER_DTO = new UserDTO(-1L, "", "", "", "", UserRole.USER);

    private static final DriverDTO DUMMY_DRIVER_DTO = new DriverDTO(-1L, "", "", Gender.UNSPECIFIED);
    private DriverDTO driverDTO;

    public Map<String, Record> buildDTO() {
        UserDTO udto = userDTO == null ? DUMMY_USER_DTO : userDTO;
        DriverDTO ddto = driverDTO == null ? DUMMY_DRIVER_DTO : driverDTO;

        return Map.of(
                USER_DTO, udto,
                DRIVER_DTO, ddto
        );
    }

}
