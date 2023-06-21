package ro.license.livepark;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.license.livepark.controller.login.LoginRegisterController;

@SpringBootTest
public class SmokeTest {

    @Autowired
    private LoginRegisterController loginRegisterController;

    @org.junit.jupiter.api.Test
    public void loginRegisterAutowired() {
        assert(loginRegisterController != null);
    }
}
