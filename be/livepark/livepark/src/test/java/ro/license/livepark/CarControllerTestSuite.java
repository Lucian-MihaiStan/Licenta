package ro.license.livepark;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import ro.license.livepark.auth.JWToken;
import ro.license.livepark.controller.login.LoginRegisterService;
import ro.license.livepark.entities.car.CarDTO;
import ro.license.livepark.http.packages.received.LoginUserRequestPkg;
import ro.license.livepark.http.packages.received.RegisterUserRequestPkg;
import ro.license.livepark.utilities.Constants;
import ro.license.livepark.utilities.GlobalRepository;
import ro.license.livepark.utilities.TokenDetails;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class CarControllerTestSuite {

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

    @AfterEach
    public void afterEach() {

        globalRepository.clearAll();

        userId = 0;
        token = null;
        role = null;
    }

    @Test
    @Rollback
    public List<CarDTO> carsTest() throws Exception {
        String contentAsString = mockMvc.perform(MockMvcRequestBuilders.get("/api/car/cars" + "?userId=" + userId)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Access-Control-Allow-Origin", "*")
                .header("Origin", "http://localhost:3000")
                .header("Authorization", "Bearer " + token)
        ).andReturn().getResponse().getContentAsString();

        List<CarDTO> carList = objectMapper.readValue(contentAsString, new TypeReference<List<CarDTO>>() {});
        return carList;
    }

    @Test
    @Rollback
    public void addCarTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/car/addcar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content("{\"ownerId\":\"" + userId + "\",\"vin\":\"vin\",\"plate\":\"plate\",\"brand\":\"AUDI\",\"model\":\"model\",\"fabricationDate\":\"2021-01-01\"}")
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("{\"message\":\"Car Added\"}"));
    }

    @Test
    @Rollback
    public void carTest() throws Exception {
        addCarTest();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/car/car" + "?carId=" + 1)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Access-Control-Allow-Origin", "*")
                .header("Origin", "http://localhost:3000")
                .header("Authorization", "Bearer " + token)
        ).andReturn().getResponse().getContentAsString();
    }

    @Test
    @Rollback
    public void addCarEquipment() throws Exception {
        addCarTest();


        List<CarDTO> carDTOS = carsTest();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/car/car/equipment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content("{\"carId\":\"" + carDTOS.get(0).carId() + "\",\"equipmentType\":\"fireextinguisher\",\"equipmentExpirationDate\":\"2021-01-01\"}")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @Rollback
    public void addCarDocument() throws Exception {
        addCarTest();

        List<CarDTO> carDTOS = carsTest();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/car/car/document")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content("{\"entityId\":\"" + carDTOS.get(0).carId() + "\",\"documentType\":\"rca\",\"documentId\":\"1\"}")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @Rollback
    public void addCarDocumentExpiration() throws Exception {
        addCarTest();

        List<CarDTO> carDTOS = carsTest();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/car/car/documentExpirationDate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Origin", "http://localhost:3000")
                        .header("Authorization", "Bearer " + token)
                        .content("{\"carId\":\"" + carDTOS.get(0).carId() + "\",\"documentType\":\"rca\",\"documentExpirationDate\":\"2021-01-01\"}")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
