import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Models } from "./car";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "./car_get";

export const CarForm = () => {

    const router = useRouter();
    const carId = router.query.carId;
    const userId = router.query.owner;

    const [car, setCar] = useState<Models.CarModel>();
    const [date, setDate] = useState<Date>(new Date());

    const carInfo = async () => {
        setCar(await CarBackendConnectUtils.requestCar(carId as string));
    }

    useEffect(() => {
        carInfo();
    }, []);

    if (car == null)
        return <div> Loading... </div>

    const setInspectionDate = (event: any) => {
        const value = event.target.value;
        setDate({ ...date, [event.target.name]: value });
    };

    function removeVehicle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

    function routeToCarDocument(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, document_type: string): void {
        e.preventDefault();
        router.push(`${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${carId}${GlobalConstants.DOCUMENT}/${document_type}`);
    }

    function routeToEquipment(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, equipment_type: any): void {
        router.push(`${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${carId}${GlobalConstants.EQUIPMENT}/${equipment_type}`);
    }

    return (
        <div>
            <h1> Car Documents </h1>

            <div>
                <div>{car.ownerId}</div>
                <div>{car.brand}</div>
                <div>{car.model}</div>
                <div>{car.plate}</div>
                <div>{car.vin}</div>
                <div>{car.fabricationDate.toLocaleString()}</div>

                <div>
                    <button onClick={(e) => routeToCarDocument(e, GlobalConstants.RCA)}> RCA </button>
                </div>
                
                <div>
                    <button onClick={(e) => routeToCarDocument(e, GlobalConstants.ITP)}> ITP </button>
                </div>

                <div>
                    <button onClick={(e) => routeToCarDocument(e, GlobalConstants.ROVINIETA)}> Rovinieta </button>
                </div>

                <div>
                    <button onClick={(e) => routeToCarDocument(e, GlobalConstants.CASCO)}> CASCO </button>
                </div>

                <div>
                    <button onClick={(e) => routeToEquipment(e, GlobalConstants.FIRE_EXTINGUISHER)}> Fire Extinguisher </button>
                </div>

                <div>
                    <button onClick={(e) => routeToEquipment(e, GlobalConstants.FIRST_AID_KIT)}> First Aid Kit </button>
                </div>

                <div> <button onClick={(e) => removeVehicle(e)}> Remove Vehicle </button> </div>

            </div>

</div>
    )
}