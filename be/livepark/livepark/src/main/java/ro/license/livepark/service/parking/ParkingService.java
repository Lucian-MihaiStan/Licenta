package ro.license.livepark.service.parking;

import jakarta.annotation.Resource;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import ro.license.livepark.config.parkingUtils.ParkingMqttCallback;
import ro.license.livepark.entities.parking.SensorConfiguration;
import ro.license.livepark.dto.parking.ParkingDTO;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.dto.parking.ParkingInfoDTO;
import ro.license.livepark.repository.parking.ParkingRepository;
import ro.license.livepark.repository.parking.ParkingSpotRepository;
import ro.license.livepark.repository.parking.ReservationRepository;

import java.util.List;

@Service
public class ParkingService {
    @Resource
    private ParkingRepository parkingRepository;

    @Resource
    private ParkingSpotRepository parkingSpotRepository;

    @Resource
    private ReservationRepository reservationRepository;

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

    public ParkingDTO getParkingDTO(int id) {
        if (parkingRepository.findById(id).isEmpty())
            return null;
        Parking p = parkingRepository.findById(id).get();
        return new ParkingDTO(p.getName(), p.getAddress(), p.getLat(), p.getLng(), p.getParkingFee(), p.getEXPIRATION_HOURS(), p.getEXPIRATION_MINUTES(), p.getSensorConfig());
    }

    public Parking getParking(Integer id) {
        if (parkingRepository.findById(id).isEmpty())
            return null;
        return parkingRepository.findById(id).get();
    }

    private void initParkingFromDTO(Parking p, ParkingDTO dto) {
        p.setName(dto.getName());
        p.setAddress(dto.getAddress());
        p.setLat(dto.getLat());
        p.setLng(dto.getLng());
        p.setParkingFee(dto.getParkingFee());
        p.setEXPIRATION_HOURS(dto.getExpiration_hours() != null ? dto.getExpiration_hours() : 0);
        p.setEXPIRATION_MINUTES(dto.getExpiration_minutes() != null ? dto.getExpiration_minutes() : 0);
        p.setSensorConfig(dto.getSensorConfig());
    }

    public int addParking(ParkingDTO dto, Long adminId) {
        Parking p = new Parking();
        initParkingFromDTO(p, dto);
        p.setAdminId(adminId);
        parkingRepository.save(p);

        SensorConfiguration config = dto.getSensorConfig();
        if (config != null) {
            if (!createMqttClient(p, config)) {
                parkingRepository.delete(p);
                return -1;
            }
            System.out.println("Created a new MqttClient with clientId: " + p.getMqttClient().getClientId());
            parkingRepository.save(p);
        }
        return p.getId();
    }

    public boolean modifyParking(int id, ParkingDTO dto) {
        if (parkingRepository.findById(id).isEmpty())
            return false;
        Parking p = parkingRepository.findById(id).get();
        initParkingFromDTO(p, dto);
        SensorConfiguration config = dto.getSensorConfig();
        if (config != null && !config.equals(p.getSensorConfig())) {
            if (!createMqttClient(p, config))
                return false;
        }
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

    private boolean createMqttClient(Parking p, SensorConfiguration config) {
        String broker;
        if (config.isWithTLS())
            broker = "ssl://" + config.getHost() + ":" + config.getPort();
        else
            broker = "tcp://" + config.getHost() + ":" + config.getPort();
        String clientId = MqttClient.generateClientId();
        int qos = 0;
        try {
            MqttClient client = new MqttClient(broker, clientId, new MemoryPersistence());
            MqttConnectOptions options = new MqttConnectOptions();
            options.setUserName(config.getUsername());
            options.setPassword(config.getPassword().toCharArray());
            options.setConnectionTimeout(60);
            options.setAutomaticReconnect(true);
            options.setCleanSession(false);
            options.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
            client.setCallback(new ParkingMqttCallback(p, parkingRepository, parkingSpotRepository, reservationRepository));
            client.connect(options);
            client.subscribe(config.getTopic(), qos);
            p.setSensorConfig(config);
            p.setMqttClient(client);
        } catch(MqttException e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void recreateMqttClients() {
        System.out.println("Recreating MQTT Clients after start...");
        List<Parking> parkings = parkingRepository.findAll();
        for (Parking p : parkings) {
            if (p.getSensorConfig() != null) {
                boolean ok = createMqttClient(p, p.getSensorConfig());
                if (!ok)
                    System.out.println("Could not create MQTT Client for parking with id " + p.getId() + ".");
            }
        }
    }
}
