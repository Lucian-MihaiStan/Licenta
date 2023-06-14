package ro.license.livepark.config.parkingUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Component;
import ro.license.livepark.entities.parking.Parking;
import ro.license.livepark.entities.parking.ParkingSpot;
import ro.license.livepark.repository.parking.ParkingRepository;
import ro.license.livepark.repository.parking.ParkingSpotRepository;

import java.util.Base64;
import java.util.List;
import java.util.Map;

public class ParkingMqttCallback implements MqttCallback {

    private Parking p;
    private ParkingSpotRepository parkingSpotRepository;
    private ParkingRepository parkingRepository;

    public ParkingMqttCallback(Parking p, ParkingRepository parkingRepository, ParkingSpotRepository parkingSpotRepository) {
        this.p = p;
        this.parkingRepository = parkingRepository;
        this.parkingSpotRepository = parkingSpotRepository;
    }

    public void connectionLost(Throwable cause) {
        System.out.println("connectionLost: " + cause.getMessage());
    }

    public void messageArrived(String topic, MqttMessage message) {
        String msg = new String(message.getPayload());
        System.out.println("MQTT message received on topic: " + topic);
        try {
            Map map = new ObjectMapper().readValue(msg, Map.class);
            String device = (String) ((Map) map.get("end_device_ids")).get("device_id");
            if (parkingRepository.findById(p.getId()).isEmpty())
                throw new RuntimeException();
            List<ParkingSpot> parkingSpots = parkingRepository.findById(p.getId()).get().getParkingSpots();
            for (ParkingSpot parkingSpot : parkingSpots) {
                if (parkingSpot.getSensor() != null && parkingSpot.getSensor().getDeviceName().equals(device)) {
                    Map value = (Map) map.get("uplink_message");
                    String payload = (String) value.get("frm_payload");
                    byte[] decoded_bytes = Base64.getDecoder().decode(payload);
                    byte header_first = decoded_bytes[0];
                    int frametype = header_first & 15; // bits 0-3
                    if (frametype == 0 || frametype == 1) {
                        int status = (header_first >> 7) & 1;
                        if (status == 0 && parkingSpot.getStatus() != ParkingSpot.ParkingSpotStatus.EMPTY) {
                            parkingSpot.setStatus(ParkingSpot.ParkingSpotStatus.EMPTY);
                            parkingSpotRepository.save(parkingSpot);
                        }
                        if (status == 1 && parkingSpot.getStatus() != ParkingSpot.ParkingSpotStatus.OCCUPIED) {
                            parkingSpot.setStatus(ParkingSpot.ParkingSpotStatus.OCCUPIED);
                            parkingSpotRepository.save(parkingSpot);
                        }
                    }
                }
            }

        } catch (JsonProcessingException e) {
            System.out.println("Could not process the message. it will be ignored.");
        }
    }

    public void deliveryComplete(IMqttDeliveryToken token) {}

}
