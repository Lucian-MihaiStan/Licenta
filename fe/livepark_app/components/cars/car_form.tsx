import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Models } from "./car";
import { GlobalConstants } from "../globalc_namespace/global-constants";

export const CarForm = () => {

    const router = useRouter();
    const carId = router.query.carId;

    const [car, setCar] = useState<Models.CarModel>();

    const handleCar = async () => {
        const url = `${GlobalConstants.CAR_LINK}?carId=${carId}`;
        const _carinfo = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK
            }
        });

        const _car = await _carinfo.json();
        setCar(_car);
    }

    useEffect(() => {
        handleCar();
    }, []);

    return (
        <div>
            <h1> Car Documents </h1>

            { 
                car != null ? 
                (
                    <div>
                        <div>{car.ownerId}</div>
                        <div>{car.model}</div>
                        <div>{car.plate}</div>
                        <div>{car.vin}</div>
                    </div>
                )
                : "Loading..."
            }
        </div>
    )
}