package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.repository.parking.ParkingRepository;

@Service
public class ParkingService {
    @Resource
    private ParkingRepository parkingRepository;


}
