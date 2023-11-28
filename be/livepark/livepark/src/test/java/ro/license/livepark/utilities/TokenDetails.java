package ro.license.livepark.utilities;

import org.antlr.v4.runtime.Token;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TokenDetails {

    public static TokenDetails from(String input) {
        String regex = "\"token\":\"(.*?)\",\"userId\":(\\d+),\"userRole\":\"(.*?)\"";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);

        // If a match is found, create a TokenDetails object with extracted values
        if (matcher.find()) {
            String token = matcher.group(1);
            int userId = Integer.parseInt(matcher.group(2));
            String userRole = matcher.group(3);

            return new TokenDetails(token, userId, userRole);
        }

        // Return null if no match is found
        return null;
    }

    private final String token;
    private final int userId;
    private final String userRole;

    public TokenDetails(String token, int userId, String userRole) {
        this.token = token;
        this.userId = userId;
        this.userRole = userRole;
    }

    public String getToken() {
        return token;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserRole() {
        return userRole;
    }

}
