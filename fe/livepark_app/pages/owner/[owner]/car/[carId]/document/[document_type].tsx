import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../../../../../components/navigation_bar/navigation-bar";
import { UploadDocumentForm } from "../../../../../../components/upload_document-form";
import { GlobalConstants } from "../../../../../../components/globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "@/components/cars/car_get";

const DocumentType: NextPage = () => {
    
    const router = useRouter();
    const userId = router.query.userId;
    const carId = router.query.carId;
    const document_type = router.query.document_type;

    const [newDocumentExpirationDate, setDocumentExpirationDate] = useState('');
    const [oldDocumentExpirationdate, setOldDocumentExpirationDate] = useState('no date');

    let carDocument = "";
    if (carId == null)
        return <div> Loading... </div>

    const documentInfo = async() => {
        const localCar = await CarBackendConnectUtils.requestCar(carId as string);
        if (localCar != null) {
            switch (document_type) {
                case GlobalConstants.RCA:
                    carDocument = localCar.rcaId;
                    if (localCar.rcaExpirationDate != null)
                        setOldDocumentExpirationDate(localCar.rcaExpirationDate.toLocaleString());
                    else
                        setOldDocumentExpirationDate("");
                    break;
                case GlobalConstants.ITP:
                    carDocument = localCar.itpId;
                    if (localCar.itpExpirationDate != null)
                        setOldDocumentExpirationDate(localCar.itpExpirationDate.toLocaleString());
                    else
                        setOldDocumentExpirationDate("");
                    break;
                case GlobalConstants.ROVINIETA:
                    carDocument = localCar.rovinietaId;
                    if (localCar.rovinietaExpirationDate != null)
                        setOldDocumentExpirationDate(localCar.rovinietaExpirationDate.toLocaleString());
                    else
                        setOldDocumentExpirationDate("");
                    break;
                case GlobalConstants.CASCO:
                    carDocument = localCar.cascoId;
                    if (localCar.cascoExpirationDate != null)
                        setOldDocumentExpirationDate(localCar.cascoExpirationDate.toLocaleString());
                    else
                        setOldDocumentExpirationDate("");
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

    return (

        <div>
            <NavigationBar/>

            {
                carDocument != "" ?
                    <div> {document_type}: {carDocument} </div> :
                    <div>
                        No {document_type} added. Please load the document.
                    </div>
            }
            
            <UploadDocumentForm
            entityId={userId as string}
            document_name={document_type as string}
            url={GlobalConstants.DOCUMENT_LINK}/>

            {
                oldDocumentExpirationdate != "" ?
                    <div> Expiration date: {oldDocumentExpirationdate} </div> :
                    <div> No expiration date set </div>
            }

            <div> Expiration date: 
                <input
                    type="date"
                    value={newDocumentExpirationDate}
                    onChange={e => { setDocumentExpirationDate(e.currentTarget.value); }}/> 
            </div>

            <button onClick={(e) => postDocument(e)}> Update Document Expiration Date </button>

        </div>   
    )
}

export default DocumentType;