package ro.license.livepark.entities.car;

import org.springframework.stereotype.Service;
import ro.license.livepark.http.packages.received.HttpCarPkg;

import java.sql.Date;
import java.util.function.Function;

@Service
public class HttpCarMapper implements Function<HttpCarPkg, Car> {

    @Override
    public Car apply(HttpCarPkg httpCarPkg) {
        if (httpCarPkg == null)
            return null;

        return Car.builder()
                .ownerId(Long.valueOf(httpCarPkg.getOwnerId()))
                .plate(httpCarPkg.getPlate())
                .vin(httpCarPkg.getVin())
                .brand(CarBrand.AUDI)
                .model(httpCarPkg.getModel())
                .fabricationDate(Date.valueOf(httpCarPkg.getFabricationDate()))
                .insuranceId(Long.valueOf(httpCarPkg.getInsuranceId()))
                .inspectionId(Long.valueOf(httpCarPkg.getInspectionId()))
                .build();
    }
}
