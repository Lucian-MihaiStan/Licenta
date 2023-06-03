package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.dto.parking.ParkingDTO;
import ro.license.livepark.dto.parking.ParkingInfoDTO;
import ro.license.livepark.dto.parking.ParkingSpotDTO;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.repository.parking.ParkingRepository;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.SensorRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParkingSpotService {
    @Resource
    private ParkingSpotRepository parkingSpotRepository;

    @Resource
    private ParkingRepository parkingRepository;

    @Resource
    private SensorRepository sensorRepository;

    public ParkingSpotDTO convertParkingSpotToDTO(ParkingSpot p) {
        ParkingSpotDTO dto = new ParkingSpotDTO();
        dto.setId(p.getId());
        dto.setNumber(p.getNumber());
        dto.setParking_id(p.getParking().getId());
        dto.setStatus(p.getStatus());
        return dto;
    }

    public ParkingSpotDTO getParkingSpot(int id) {
        // TODO Update the status by accessing the sensor endpoint
        if (parkingSpotRepository.findById(id).isEmpty())
            return null;
        ParkingSpot p = parkingSpotRepository.findById(id).get();
        return convertParkingSpotToDTO(p);
    }

    public List<ParkingSpotDTO> getAllParkingSpotsFromParking(int id) {
        if (parkingRepository.findById(id).isEmpty())
            return null;
        Parking p = parkingRepository.findById(id).get();
        List<ParkingSpot> parkingSpots = parkingSpotRepository.findAllByParking(p);
        return parkingSpots.stream().map(this::convertParkingSpotToDTO).toList();
    }

    public boolean addParkingSpot(ParkingSpotDTO dto) {
        if (parkingRepository.findById(dto.getParking_id()).isEmpty())
            return false;
        ParkingSpot p = new ParkingSpot();
        p.setNumber(dto.getNumber());
        p.setParking(parkingRepository.findById(dto.getParking_id()).get());
        parkingSpotRepository.save(p);
        return true;
    }

    public boolean modifyParkingSpot(int id, ParkingSpotDTO dto) {
        if (parkingSpotRepository.findById(id).isEmpty())
            return false;
        if (parkingRepository.findById(dto.getParking_id()).isEmpty())
            return false;
        ParkingSpot p = parkingSpotRepository.findById(id).get();
        p.setNumber(dto.getNumber());
        p.setParking(parkingRepository.findById(dto.getParking_id()).get());
        parkingSpotRepository.save(p);
        return true;
    }

    public boolean deleteParkingSpot(int id) {
        if (parkingSpotRepository.findById(id).isEmpty())
            return false;
        ParkingSpot p = parkingSpotRepository.findById(id).get();
        parkingSpotRepository.delete(p);
        return true;
    }
}
