import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Models } from "./car";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../upload_document-form";

export const CarForm = () => {

    const router = useRouter();
    const carId = router.query.carId;
    const userId = router.query.owner;

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

    if (car == null)
        return <div> Loading... </div>

    return (
        <div>
            <h1> Car Documents </h1>

            <div>
                <div>{car.ownerId}</div>
                <div>{car.brand}</div>
                <div>{car.model}</div>
                <div>{car.plate}</div>
                <div>{car.vin}</div>
                <div>{car.fabricationDate}</div>

                {
                    car.inspectionId != "" ? 
                        <div> Inspection: {car.inspectionId} </div> : 
                        <div> 
                            No inspection Please load 
                            <UploadDocumentForm
                                userId={userId as string}
                                document_name={UploadDocumentFormNamespace.INSURANCE}
                                url={GlobalConstants.POST_INSURANCE_LINK}/>
                        </div>
                }

                {
                    car.insuranceId != "" ?
                        <div> Insurance: {car.insuranceId} </div> :
                        <div>
                            No insurance Please load
                            <UploadDocumentForm
                                userId={userId as string}
                                document_name={UploadDocumentFormNamespace.BRIEF}
                                url={GlobalConstants.POST_BRIEF_LINK}/>
                        </div>
                }
            </div>

</div>
    )
}