package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.repository.parking.SensorRepository;

@Service
public class SensorService {
    @Resource
    private SensorRepository sensorRepository;
}
