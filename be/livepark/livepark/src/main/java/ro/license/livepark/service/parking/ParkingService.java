package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import ro.license.livepark.dto.parking.ParkingDTO;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.dto.parking.ParkingInfoDTO;
import ro.license.livepark.repository.parking.ParkingRepository;

import java.util.List;

@Service
public class ParkingService {
    @Resource
    private ParkingRepository parkingRepository;

    public ParkingInfoDTO convertParkingToDTO(Parking p) {
        ParkingInfoDTO dto = new ParkingInfoDTO();
        boolean hasSensors = p.getParkingSpots().stream().anyMatch(
                parkingSpot -> parkingSpot.getSensor() != null);
        Integer emptySpots = p.getParkingSpots().stream()
                .filter(ps -> ps.getStatus().equals(ParkingSpot.ParkingSpotStatus.EMPTY))
                .toList().size();

        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setAddress(p.getAddress());
        dto.setMapsLink(p.getMapsLink());
        dto.setParkingFee(p.getParkingFee());
        dto.setTotalSpots(p.getParkingSpots().size());
        dto.setHasSensors(hasSensors);
        dto.setEmptySpots(emptySpots);
        return dto;
    }

    public List<ParkingInfoDTO> getAllParkingsInfo() {
        List<Parking> parkings = parkingRepository.findAll();
        return parkings.stream().map(this::convertParkingToDTO).toList();
    }

    public ParkingDTO getParking(int id) {
        if (parkingRepository.findById(id).isEmpty())
            return null;
        Parking p = parkingRepository.findById(id).get();

        ParkingDTO dto = new ParkingDTO();
        dto.setName(p.getName());
        dto.setAddress(p.getAddress());
        dto.setMapsLink(p.getMapsLink());
        dto.setParkingFee(p.getParkingFee());
        dto.setEXPIRATION_HOURS(p.getEXPIRATION_HOURS());
        dto.setEXPIRATION_MINUTES(p.getEXPIRATION_MINUTES());
        return dto;
    }

    public void addParking(ParkingDTO dto) {
        Parking p = new Parking();
        p.setName(dto.getName());
        p.setAddress(dto.getAddress());
        p.setMapsLink(dto.getMapsLink());
        p.setParkingFee(dto.getParkingFee());
        p.setEXPIRATION_HOURS(dto.getEXPIRATION_HOURS());
        p.setEXPIRATION_MINUTES(dto.getEXPIRATION_MINUTES());
        parkingRepository.save(p);
    }

    public boolean modifyParking(int id, ParkingDTO dto) {
        if (parkingRepository.findById(id).isEmpty())
            return false;
        Parking p = parkingRepository.findById(id).get();
        p.setName(dto.getName());
        p.setAddress(dto.getAddress());
        p.setMapsLink(dto.getMapsLink());
        p.setParkingFee(dto.getParkingFee());
        p.setEXPIRATION_HOURS(dto.getEXPIRATION_HOURS());
        p.setEXPIRATION_MINUTES(dto.getEXPIRATION_MINUTES());
        return true;
    }

    public boolean deleteParking(int id) {
        if (parkingRepository.findById(id).isEmpty())
            return false;
        Parking p = parkingRepository.findById(id).get();
        parkingRepository.delete(p);
        return true;
    }


}
