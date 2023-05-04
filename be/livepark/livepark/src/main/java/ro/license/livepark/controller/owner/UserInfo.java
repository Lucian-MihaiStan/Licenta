package ro.license.livepark.controller.owner;

import lombok.Builder;
import lombok.Data;
import ro.license.livepark.entities.driver.DriverDTO;
import ro.license.livepark.entities.user.UserDTO;

import java.util.Map;

@Data
@Builder
public class UserInfo {

    public static final String USER_DTO = "userDTO";
    public static final String DRIVER_DTO = "driverDTO";
    private UserDTO userDTO;

    private DriverDTO driverDTO;

    public Map<String, Record> buildDTO() {
        return Map.of(
                USER_DTO, userDTO,
                DRIVER_DTO, driverDTO
        );
    }

}
