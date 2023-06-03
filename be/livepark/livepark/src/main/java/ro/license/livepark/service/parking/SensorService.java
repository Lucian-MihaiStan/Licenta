package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.dto.parking.SensorDTO;
import ro.license.livepark.entities.parking.Sensor;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.SensorRepository;

@Service
public class SensorService {
    @Resource
    private SensorRepository sensorRepository;

    @Resource
    private ParkingSpotRepository parkingSpotRepository;

    public SensorDTO getSensor(int id) {
        if (sensorRepository.findById(id).isEmpty())
            return null;
        Sensor s = sensorRepository.findById(id).get();
        SensorDTO dto = new SensorDTO();
        dto.setAccessUrl(s.getAccessUrl());
        dto.setParkingSpot_id(s.getParkingSpot().getId());
        return dto;
    }

    public boolean addSensor(SensorDTO dto) {
        // TODO Change the parking spot status by accessing the sensor endpoint
        if (parkingSpotRepository.findById(dto.getParkingSpot_id()).isEmpty())
            return false;
        Sensor s = new Sensor();
        s.setAccessUrl(dto.getAccessUrl());
        s.setParkingSpot(parkingSpotRepository.findById(dto.getParkingSpot_id()).get());
        sensorRepository.save(s);
        return true;
    }

    public boolean modifySensor(int id, SensorDTO dto) {
        if (sensorRepository.findById(id).isEmpty())
            return false;
        if (parkingSpotRepository.findById(dto.getParkingSpot_id()).isEmpty())
            return false;
        Sensor s = sensorRepository.findById(id).get();
        s.setAccessUrl(dto.getAccessUrl());
        s.setParkingSpot(parkingSpotRepository.findById(dto.getParkingSpot_id()).get());
        sensorRepository.save(s);
        return true;
    }

    public boolean deleteSensor(int id) {
        if (sensorRepository.findById(id).isEmpty())
            return false;
        Sensor s = sensorRepository.findById(id).get();
        sensorRepository.delete(s);
        return true;
    }
}
