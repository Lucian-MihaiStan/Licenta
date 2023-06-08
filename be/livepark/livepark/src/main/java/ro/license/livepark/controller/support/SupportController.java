package ro.license.livepark.controller.support;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.license.livepark.http.packages.received.SendMailPkg;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SupportController {

    private final SupportEmailService supportEmailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendSupportEmail(@RequestBody SendMailPkg sendMailPkg) {
        try {
            supportEmailService.send(sendMailPkg.getEmail(), sendMailPkg.getSubject(),
                    sendMailPkg.getFirstName() + " " + sendMailPkg.getLastName() + ":\n" +
                    sendMailPkg.getMessage()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Email not sent");
        }
        return ResponseEntity.ok("Email sent");
    }

}
