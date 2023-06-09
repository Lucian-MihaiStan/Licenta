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
        dto.setKey(p.getKey());
        dto.setNumber(p.getNumber());
        dto.setRotated(p.isRotated());
        dto.setAutoCreated(p.isAutoCreated());
        dto.setDeleted(p.isDeleted());
        dto.setPosition(p.getPosition());
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

    public boolean addParkingSpots(List<ParkingSpotDTO> dtos, int parking_id) {
        if (parkingRepository.findById(parking_id).isEmpty())
            return false;
        Parking parking = parkingRepository.findById(parking_id).get();
        for (ParkingSpotDTO dto : dtos) {
            ParkingSpot p = new ParkingSpot();
            p.setNumber(dto.getNumber());
            p.setKey(dto.getKey());
            p.setRotated(dto.isRotated());
            p.setAutoCreated(dto.isAutoCreated());
            p.setDeleted(dto.isDeleted());
            p.setPosition(dto.getPosition());
            p.setParking(parking);
            parkingSpotRepository.save(p);
        }
        return true;
    }

    public boolean updateParkingSpots(List<ParkingSpotDTO> dtos, int parking_id) {
        if (parkingRepository.findById(parking_id).isEmpty())
            return false;
        Parking parking = parkingRepository.findById(parking_id).get();
        for (ParkingSpotDTO dto : dtos) {
            ParkingSpot p;
            if (parkingSpotRepository.findById(dto.getId()).isEmpty())
                p = new ParkingSpot();
            else
                p = parkingSpotRepository.findById(dto.getId()).get();
            p.setNumber(dto.getNumber());
            p.setKey(dto.getKey());
            p.setRotated(dto.isRotated());
            p.setAutoCreated(dto.isAutoCreated());
            p.setDeleted(dto.isDeleted());
            p.setPosition(dto.getPosition());
            p.setParking(parking);
            parkingSpotRepository.save(p);
        }
        for (ParkingSpotDTO p : getAllParkingSpotsFromParking(parking_id))
            if (dtos.stream().noneMatch(d -> d.getId() == p.getId()))
                deleteParkingSpot(p.getId());
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
