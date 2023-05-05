package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.repository.parking.ParkingSpotRepository;

@Service
public class ParkingSpotService {
    @Resource
    private ParkingSpotRepository parkingSpotRepository;
}
