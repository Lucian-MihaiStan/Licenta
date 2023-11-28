package ro.license.livepark;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
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
import ro.license.livepark.http.packages.received.DocumentIdEntityPkg;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.PasswordUpdatePkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;
import ro.license.livepark.utilities.Constants;
import ro.license.livepark.utilities.GlobalRepository;
import ro.license.livepark.utilities.TokenDetails;

@SpringBootTest
@AutoConfigureMockMvc
public class OwnerControllerTestSuite {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWToken tokenizer;

    @Autowired
    private GlobalRepository globalRepository;

    private String token;
    private int userId;
    private String role;

    @BeforeEach
    public void beforeEach() throws Exception {
        {
            RegisterUserRequestPkg requestPkg = RegisterUserRequestPkg.builder()
                    .firstName(Constants.firstName)
                    .lastName(Constants.lastName)
                    .username(Constants.username)
                    .email(Constants.email)
                    .password(Constants.password)
                    .build();

            mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Origin", "http://localhost:3000")
                            .content(objectMapper.writeValueAsString(requestPkg))
                    )
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Successfully register!\"}"));


            String mailToken = LoginRegisterService.getJwtToken(Constants.username, Constants.password, authenticationManager, tokenizer);

            mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/validate_email" + "?token=" + mailToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Origin", "http://localhost:3000")
                            .header("Authorization", "Bearer " + mailToken)
                    )
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Successfully validated!\"}"));

            LoginUserRequestPkg loginUserRequestPkg = LoginUserRequestPkg.builder()
                    .username(Constants.username)
                    .password(Constants.password)
                    .build();

            String origin = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Origin", "http://localhost:3000")
                            .content(objectMapper.writeValueAsString(loginUserRequestPkg))
                    )
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andReturn().getResponse().getContentAsString();

            TokenDetails tokenDetails = TokenDetails.from(origin);
            if (tokenDetails == null)
                throw new Exception("Token is null");

            token = tokenDetails.getToken();
            userId = tokenDetails.getUserId();
            role = tokenDetails.getUserRole();

            mockMvc.perform(MockMvcRequestBuilders.get("/api/dashboard" + "?userId=" + userId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Origin", "http://localhost:3000")
                            .header("Authorization", "Bearer " + token)
                    )
                    .andExpect(MockMvcResultMatchers.status().isOk());
        }
    }

    @Test
    public void userInfoTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/owner/userInfo" + "?userId=" + userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void postIdCardTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/owner/postIdCard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(
                                DocumentIdEntityPkg.builder().entityId((long) userId).documentType("1234567890").documentId("1234567890").build())
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void postLicenseCard() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/owner/postLicenseCard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(
                                DocumentIdEntityPkg.builder().entityId((long) userId).documentType("1234567890").documentId("1234567890").build())
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void updatePassword() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/owner/updatePassword")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(
                                PasswordUpdatePkg.builder().username(Constants.username).newPassword("1234567890").build()
                        )))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @AfterEach
    public void afterEach() {
        token = null;
        userId = 0;
        role = null;
        globalRepository.clearAll();
    }

}
