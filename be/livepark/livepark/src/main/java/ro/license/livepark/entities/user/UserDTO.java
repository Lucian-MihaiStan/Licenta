package ro.license.livepark.entities.user;

public record UserDTO (
        Long userId,
        String username,
        String email,

        String firstName,
        String lastName
) {
}
