import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../../../../../components/navigation_bar/navigation-bar";
import { UploadDocumentForm } from "../../../../../../components/upload_document-form";
import { GlobalConstants } from "../../../../../../components/globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "@/components/cars/car_get";

const DocumentType: NextPage = () => {
    
    const router = useRouter();
    const userId = router.query.owner;
    const carId = router.query.carId;
    const document_type = router.query.document_type;

    const [newDocumentExpirationDate, setDocumentExpirationDate] = useState('');
    const [oldDocumentExpirationdate, setOldDocumentExpirationDate] = useState('no date');
    const [oldCarDocumentId, setOldCarDocumentId] = useState('no data');

    const [oldDocumentBase64Encode, setOldDocumentBase64Encode] = useState("");

    const documentInfo = async() => {
        const localCar = await CarBackendConnectUtils.requestCar(carId as string);
        if (localCar == null)
            return;

        let localDocToRequest = null;
        
        switch (document_type) {
            case GlobalConstants.RCA:
                setOldCarDocumentId(localCar.rcaId);
                localDocToRequest = localCar.rcaId;
                if (localCar.rcaExpirationDate != null)
                    setOldDocumentExpirationDate(localCar.rcaExpirationDate.toLocaleString());
                break;
            case GlobalConstants.ITP:
                setOldCarDocumentId(localCar.itpId);
                localDocToRequest = localCar.itpId;
                if (localCar.itpExpirationDate != null)
                    setOldDocumentExpirationDate(localCar.itpExpirationDate.toLocaleString());
                break;
            case GlobalConstants.ROVINIETA:
                setOldCarDocumentId(localCar.rovinietaId);
                localDocToRequest = localCar.rovinietaId;
                if (localCar.rovinietaExpirationDate != null)
                    setOldDocumentExpirationDate(localCar.rovinietaExpirationDate.toLocaleString());
                break;
            case GlobalConstants.CASCO:
                setOldCarDocumentId(localCar.cascoId);
                localDocToRequest = localCar.cascoId;
                if (localCar.cascoExpirationDate != null)
                    setOldDocumentExpirationDate(localCar.cascoExpirationDate.toLocaleString());
                break;
            default:
                break;
        }

        console.log("old document");
        console.log(localDocToRequest);

        if (localDocToRequest == null || localDocToRequest == 'no data')
            return;

        try {
            const url = `${GlobalConstants.GET_DOCUMENT_LINK}/${localDocToRequest}`;
            const response = await fetch(url, {
                method: GlobalConstants.GET_REQUEST,
                headers: {
                    "Access-Control-Allow-Origin": GlobalConstants.STAR,
                    "Content-Type": GlobalConstants.APPLICATION_JSON,
                    "Origin": GlobalConstants.FRONTEND_API_LINK,
                }
            });

            if (!response.ok) {
                console.log("Not found");
                return;
            }

            const _document = await response.json();
            if (_document == null) {
                console.log("data base didn't retrive the document");
                return;
            }

            if (_document['file'] == null) {
                console.log("data base didn't retrive the document in json");
                return;
            }

            setOldDocumentBase64Encode(_document['file']);
        } catch (error) {
            console.log(error);
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
                "Authorization": "Bearer " + sessionStorage.getItem(GlobalConstants.TOKEN)
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
    }, [carId, userId, document_type]);

    if (carId == null)
        return <div> Loading... </div>

    return (

        <div>
            <NavigationBar/>

            {
                oldCarDocumentId != null && oldCarDocumentId != '' && oldCarDocumentId != 'no data' ?
                    <div> {document_type}: {oldCarDocumentId} </div> :
                    <div>
                        No {document_type} added. Please load the document.
                    </div>
            }

            {
                oldDocumentBase64Encode != null && oldDocumentBase64Encode != "" ?
                    <div>
                        <embed src={oldDocumentBase64Encode} />
                    </div> :
                    <div>
                        No document added. Please load the document.
                    </div>
            }

            <UploadDocumentForm
            entityId={userId}
            document_name={document_type}
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