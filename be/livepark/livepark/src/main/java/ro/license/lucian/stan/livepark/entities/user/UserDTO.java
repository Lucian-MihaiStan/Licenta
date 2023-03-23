package ro.license.lucian.stan.livepark.entities.user;

public record UserDTO(
        Integer userId,
        String username,
        String email,

        String firstName,
        String lastName
) {
}
