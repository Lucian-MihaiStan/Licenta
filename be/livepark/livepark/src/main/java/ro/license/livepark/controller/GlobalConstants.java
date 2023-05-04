package ro.license.livepark.controller;

import java.util.HashMap;
import java.util.Map;

public interface GlobalConstants {

    String STATUS = "status";
    String OK = "OK";
    String ERROR = "ERROR";

    Map<String, String> OK_STATUS = new HashMap<>() {{
        put(STATUS, OK);
    }};

    Map<String, String> ERROR_STATUS = new HashMap<>() {{
        put(STATUS, ERROR);
    }};

}
