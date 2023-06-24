import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { UploadDocumentForm } from "@/components/upload_document-form";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "@/components/cars/car_get";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'
import Head from "next/head";
import classNames from "classnames";
import cars_style from "@/components/cars/cars_styles/cars_style.module.css";
import documents_style from "@/components/cars/document_styles/document_style.module.css";
import Image from 'next/image';


const DocumentType: NextPage = () => {
    
    const router = useRouter();
    const userId = router.query.owner;
    const carId = router.query.carId;
    const document_type = router.query.document_type;
    const [car_plate, setCarPlate] = useState('no data');

    const [newDocumentExpirationDate, setDocumentExpirationDate] = useState('');
    const [oldDocumentExpirationdate, setOldDocumentExpirationDate] = useState('no date');
    const [oldCarDocumentId, setOldCarDocumentId] = useState('no data');

    const [oldDocumentBase64Encode, setOldDocumentBase64Encode] = useState("");
    const [showDesc, setShowDesc] = useState(false);

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

        localCar.plate != null ? setCarPlate(localCar.plate) : setCarPlate('no data');

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
    }, [carId, userId, document_type]);

    if (carId == null)
        return <div> Loading... </div>

    function showDescription(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
        showDesc ? setShowDesc(false) : setShowDesc(true); 
    }

    return (
        <>
        <Head>
            <title> Cars: LivePark </title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>
        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
                <div className={classNames(cars_style.cars_div_position)}>

                    <div className={classNames("row")}>

                        <div className={classNames("col")}>
                            <div className={classNames("card bg-light mb-3", documents_style.document_form)}>
                                <div className={classNames("card-header" , documents_style.title_header)}>{(document_type as string).toUpperCase()} - {car_plate}</div>
                                <div className={classNames("card-body")}>
                                    <div className={classNames("row", documents_style.subtitle)}>
                                        <div className={classNames("col")}>
                                            <h5 className={classNames("card-title")}>Răspundere Civilă Auto</h5>
                                        </div>

                                        <div className={classNames("col", documents_style.arrow_drop)}>
                                            <Image onClick={(e) => showDescription(e)} className={navigationBarStyle.padding_icon} src='/arrow.png' width={30} height={30} alt={"Description"}/>
                                        </div>
                                    </div>

                                    {
                                        showDesc ? 
                                        
                                        <div className={classNames("row", documents_style.description_div)}>
                                            <div className={classNames("col")}>
                                                Asigurarea de Răspundere Civilă Auto (RCA) este o asigurare obligatorie de răspundere civilă,
                                                al cărei principal beneficiu pentru cumpărător este dreptul de a circula cu automobilul pe drumurile publice, 
                                                iar în urma unui accident rutier eventualul prejudiciat fiind adevăratul beneficiar al serviciilor asiguratorului.
                                            </div>
                                        </div>

                                        : <></>

                                    }

                                

                                    <div className={classNames(documents_style.infos)}>
                                        <div className={classNames("row", "col")}>
                                            {
                                                oldCarDocumentId != null && oldCarDocumentId != '' && oldCarDocumentId != 'no data' ?
                                                <div> {document_type}: {oldCarDocumentId} </div> :
                                                <div>
                                                        No {(document_type as string).toUpperCase()} added. Please load the document.
                                                    </div>
                                            }


                                        </div>

                                        <div className={classNames("row", "col")}>
                                            {
                                                oldDocumentBase64Encode != null && oldDocumentBase64Encode != "" ?
                                                    <div>
                                                        <embed src={oldDocumentBase64Encode} />
                                                    </div> :
                                                    <div>
                                                        No document added.
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className={classNames(documents_style.infos)}>
                                        <div className={classNames("row", "col")}>

                                        {
                                            oldDocumentExpirationdate != "" ?
                                                <div> Expiration date: {oldDocumentExpirationdate} </div> :
                                                <div> No expiration date set </div>
                                        }

                                        </div>

                                        <div className={classNames("row", "col", documents_style.input_date_div)}>
                                            <input className={classNames(documents_style.input_date)}
                                                type="date"
                                                value={newDocumentExpirationDate}
                                                onChange={e => { setDocumentExpirationDate(e.currentTarget.value); }}/> 
                                        </div>
                                    </div>
                                    
                                    <div className={classNames(documents_style.btn_update_div)}>
                                        <button className={classNames("btn btn-secondary", documents_style.btn_update_date)} onClick={(e) => postDocument(e)}> Update Document Expiration Date </button>
                                    </div>
                                    
                                    <UploadDocumentForm
                                        entityId={userId as string}
                                        document_name={document_type}
                                        url={GlobalConstants.DOCUMENT_LINK}
                                    />

                                </div>
                            </div>
                        </div>

                    </div>


                    

             

                    
                </div>
            </section>
        </div>
        </>
    )
}

export default DocumentType;