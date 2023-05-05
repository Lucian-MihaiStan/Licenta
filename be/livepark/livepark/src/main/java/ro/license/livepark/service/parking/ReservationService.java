package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.repository.parking.ReservationRepository;

@Service
public class ReservationService {
    @Resource
    private ReservationRepository reservationRepository;
}
