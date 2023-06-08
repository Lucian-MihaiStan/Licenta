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
        dto.setLat(p.getLat());
        dto.setLng(p.getLng());
        dto.setParkingFee(p.getParkingFee());
        dto.setTotalSpots(p.getParkingSpots().size());
        dto.setHasSensors(hasSensors);
        dto.setEmptySpots(emptySpots);
        dto.setAdminId(p.getAdminId());
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
        dto.setLat(p.getLat());
        dto.setLng(p.getLng());
        dto.setParkingFee(p.getParkingFee());
        dto.setExpiration_hours(p.getEXPIRATION_HOURS());
        dto.setExpiration_minutes(p.getEXPIRATION_MINUTES());
        return dto;
    }

    private void initParkingFromDTO(Parking p, ParkingDTO dto) {
        p.setName(dto.getName());
        p.setAddress(dto.getAddress());
        p.setLat(dto.getLat());
        p.setLng(dto.getLng());
        p.setParkingFee(dto.getParkingFee());
        p.setEXPIRATION_HOURS(dto.getExpiration_hours());
        p.setEXPIRATION_MINUTES(dto.getExpiration_minutes());
    }

    public void addParking(ParkingDTO dto, Long adminId) {
        Parking p = new Parking();
        initParkingFromDTO(p, dto);
        p.setAdminId(adminId);
        parkingRepository.save(p);
    }

    public boolean modifyParking(int id, ParkingDTO dto) {
        if (parkingRepository.findById(id).isEmpty())
            return false;
        Parking p = parkingRepository.findById(id).get();
        initParkingFromDTO(p, dto);
        parkingRepository.save(p);
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
