package ro.license.livepark;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import ro.license.livepark.auth.JWToken;
import ro.license.livepark.controller.login.LoginRegisterService;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTestSuite {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWToken tokenizer;

    @BeforeEach
    public void beforeEach() {
        // TODO Lucian here you have to delete the database and create it again
    }

    @Test
    public void loginFlowTest() throws Exception {

        String username = "username";
        String password = "password";
        String email = "email@yahoo.com";

        RegisterUserRequestPkg requestPkg = RegisterUserRequestPkg.builder()
                .firstName("firstName")
                .lastName("lastName")
                .username(username)
                .email(email)
                .password(password)
                .build();


        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .content(objectMapper.writeValueAsString(requestPkg))
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Successfully register!\"}"));


        String token = LoginRegisterService.getJwtToken(username, password, authenticationManager, tokenizer);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/validate_email" + "?token=" + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Successfully validated!\"}"));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/forgotpassword" + "?email=" + email)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"An email had been sent validated!\"}"));

        LoginUserRequestPkg loginUserRequestPkg = LoginUserRequestPkg.builder()
                .username(username)
                .password(password)
                .build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .content(objectMapper.writeValueAsString(loginUserRequestPkg))
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString();

        // TODO Lucian You can test this if you would have some AOP in the backend
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/resetpassword" + "?token=" + loginJWToken + "&email=" + email + "&password=" + "new_" + password)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .header("Access-Control-Allow-Origin", "*")
//                        .header("Origin", "http://localhost:3000")
//                )
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Password reset successfully!\"}"));
    }

}
