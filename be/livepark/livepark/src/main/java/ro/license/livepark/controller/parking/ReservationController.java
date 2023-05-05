package ro.license.livepark.controller.parking;

import jakarta.annotation.Resource;
import ro.license.livepark.service.parking.ReservationService;

public class ReservationController {

    @Resource
    private ReservationService reservationService;
}
