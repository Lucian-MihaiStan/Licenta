package ro.license.livepark.config.parkingUtils;

import lombok.Data;

@Data
public class SensorConfiguration {
    private String host;
    private Integer port;
    private boolean withTLS;
    private String username;
    private String password;
    private String topic;
}
