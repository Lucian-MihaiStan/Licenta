package ro.license.livepark.service.car;

import org.springframework.stereotype.Service;
import ro.license.livepark.entities.car.*;
import ro.license.livepark.http.packages.received.CarIdDocumentExpiration;
import ro.license.livepark.http.packages.received.CarIdEquipment;
import ro.license.livepark.http.packages.received.DocumentIdEntityPkg;
import ro.license.livepark.repository.car.CarRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    private final CarDTOMapper carDTOMapper;

    public CarService(CarRepository carRepository, CarDTOMapper carDTOMapper) {
        this.carRepository = carRepository;
        this.carDTOMapper = carDTOMapper;
    }

    public void addCar(Car car) {
        carRepository.save(car);
    }

    public List<CarDTO> findByOwnerId(Long driverId) {
        return carRepository.findAllByDriverDriverId(driverId).stream().map(carDTOMapper).toList();
    }

    public Optional<CarDTO> findById(Long carId) {
        return carRepository.findById(carId).map(carDTOMapper);
    }

    public void updateDocumentByCarId(CarIdEquipment carRequestPkg) {
        Car car = carRepository.findById(carRequestPkg.getCarId()).orElseThrow();

        EquipmentType equipment = EquipmentType.valueOf(carRequestPkg.getEquipmentType().toUpperCase());

        switch (equipment) {
            case FIREEXTINGUISHER -> car.setFireExtinguisherExpirationDate(carRequestPkg.getEquipmentExpirationDate());
            case FIRSTAIDKIT -> car.setFirstAidKitExpirationDate(carRequestPkg.getEquipmentExpirationDate());
            default -> throw new IllegalArgumentException("Invalid equipment type");
        }

        carRepository.save(car);
    }

    public void updateCarDocumentByCarIdExpiration(CarIdDocumentExpiration carIdDocument) {
        Car car = carRepository.findById(carIdDocument.getCarId()).orElseThrow();

        DocumentType documentType = DocumentType.valueOf(carIdDocument.getDocumentType().toUpperCase());

        switch (documentType) {
            case RCA -> car.setRcaExpirationDate(carIdDocument.getDocumentExpirationDate());
            case ITP -> car.setItpExpirationDate(carIdDocument.getDocumentExpirationDate());
            case CASCO -> car.setCascoExpirationDate(carIdDocument.getDocumentExpirationDate());
            case ROVINIETA -> car.setRovinietaExpirationDate(carIdDocument.getDocumentExpirationDate());
            default -> throw new IllegalArgumentException("Invalid document type");
        }

        carRepository.save(car);
    }

    public void updateCarDocumentByCarId(DocumentIdEntityPkg carIdDocument) {
        Car car = carRepository.findById(carIdDocument.getEntityId()).orElseThrow();

        DocumentType documentType = DocumentType.valueOf(carIdDocument.getDocumentType().toUpperCase());

        switch (documentType) {
            case RCA -> car.setRcaId(carIdDocument.getDocumentId());
            case ITP -> car.setItpId(carIdDocument.getDocumentId());
            case CASCO -> car.setCascoId(carIdDocument.getDocumentId());
            case ROVINIETA -> car.setRovinietaId(carIdDocument.getDocumentId());
            default -> throw new IllegalArgumentException("Invalid document type");
        }

        carRepository.save(car);
    }

    public List<CarDTO> findAll() {
        return carRepository.findAll().stream().map(carDTOMapper).toList();
    }

    public CarDTO findByPlate(String plate) {
        return carDTOMapper.apply(carRepository.findByPlate(plate));
    }
}
