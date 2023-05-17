import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../../../../../components/navigation_bar/navigation-bar";
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../../../../../../components/upload_document-form";
import { GlobalConstants } from "../../../../../../components/globalc_namespace/global-constants";
import { Models } from "../../../../../../components/cars/car";
import { CarBackendConnectUtils } from "@/components/cars/car_get";

const DocumentType: NextPage = () => {
    
    const router = useRouter();
    const userId = router.query.userId;
    const carId = router.query.carId;
    const document_type = router.query.document_type;

    const [newDocumentExpirationDate, setDocumentExpirationDate] = useState('');

    const [car, setCar] = useState<Models.CarModel>();
    let carDocument = "";
    if (carId == null)
        return <div> Loading... </div>

    const documentInfo = async() => {
        setCar(await CarBackendConnectUtils.requestCar(carId as string));
        if (car != null) {
            switch (document_type) {
                case GlobalConstants.RCA:
                    carDocument = car.insuranceId;
                    break;
                case GlobalConstants.ITP:
                    carDocument = car.inspectionId;
                    break;
                case GlobalConstants.ROVINIETA:
                    carDocument = car.rovinietaId;
                    break;
                case GlobalConstants.CASCO:
                    carDocument = car.cascoId;
                    break;
                default:
                    break;
            }
        }
    }

    const postDocument = async (e: any) => { 
        e.preventDefault();
        const response = await fetch(`${GlobalConstants.CAR_LINK}${GlobalConstants.DOCUMENT_EXPIRATION_DATE}`, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify({
                carId: carId,
                documentType: document_type,
                documentExpirationDate: newDocumentExpirationDate
            })
        });

        if (response.ok)
            router.push(`${GlobalConstants.OWNER}/${router.query.ownerId}${GlobalConstants.CAR}/${carId}`);
    };


    useEffect(() => {
        documentInfo();
    }, []);

    if (car == null)
        return <div> Loading... </div>

    return (

        <div>
            <NavigationBar/>

            {
                carDocument != "" ?
                    <div> {document_type}: {carDocument} </div> :
                    <div>
                        No insurance Please load
                        <UploadDocumentForm
                            entityId={userId as string}
                            document_name={document_type as string}
                            url={GlobalConstants.DOCUMENT_LINK}/>
                    </div>

            }
            
            <div> Expiration date: 
                <input
                    type="date"
                    value={newDocumentExpirationDate}
                    onChange={e => { setDocumentExpirationDate(e.currentTarget.value); }}/> 
            </div>

            <button onClick={(e) => postDocument(e)}> Save Document </button>

        </div>   
    )
}

export default DocumentType;