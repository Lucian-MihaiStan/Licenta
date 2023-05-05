import React, { ChangeEvent, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import { TextBoxDivForm } from '../html_components/textbox/textbox-register-login';
import common_login_styles from '../login_pages/common_login_modules/common-login.module.css'
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../upload_document-form";
import { useRouter } from "next/router";

export const AddCarForm = () => {

    const [addCarRequest, setCar] = useState({
        ownerId: "",
        plate: "",
        vin: "",
        brand: "",
        model: "",
        fabricationDate: "",
        insuranceId: "",
        inspectionId: "",
    });

    const userId = localStorage.getItem(GlobalConstants.USER_ID) as string;

    const postCar = async (event: any) => {
        event.preventDefault();
        addCarRequest.ownerId = userId;
        addCarRequest.insuranceId = "1";
        addCarRequest.inspectionId = "1";
        addCarRequest.fabricationDate = "2021-05-05";
        const response = await fetch(GlobalConstants.ADD_CAR_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN) 
            },
            body: JSON.stringify(addCarRequest)
        });

        const _car = await response.json();
        console.log(_car);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setCar({ ...addCarRequest, [event.target.name]: value });
    }

    function removeVehicle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className={common_login_styles.loginmaindiv}>
            <div> <h1> Add car </h1> </div>

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.PLATE}
                placeholder={InputConstants.CAR_PLATE_PLACEHOLDER}
                value={addCarRequest.plate}
                handleOnchange={handleChange}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.VIN}
                placeholder={InputConstants.VIN_PLACEHOLDER}
                value={addCarRequest.vin}
                handleOnchange={handleChange}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.BRAND}
                placeholder={InputConstants.BRAND_PLACEHOLDER}
                value={addCarRequest.brand}
                handleOnchange={handleChange}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.MODEL}
                placeholder={InputConstants.MODEL_PLACEHOLDER}
                value={addCarRequest.model}
                handleOnchange={handleChange}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.FABRICATION_DATE}
                placeholder={InputConstants.FABRICATION_DATE_PLACEHOLDER}
                value={addCarRequest.fabricationDate}
                handleOnchange={handleChange}
            />

            <UploadDocumentForm
                userId={userId as string}
                document_name={UploadDocumentFormNamespace.INSURANCE}
                url={GlobalConstants.POST_INSURANCE_LINK}/>

            <UploadDocumentForm
                userId={userId as string}
                document_name={UploadDocumentFormNamespace.BRIEF}
                url={GlobalConstants.POST_BRIEF_LINK}/>

            <div> <button onClick={(e) => removeVehicle(e)}> Remove Vehicle </button> </div>

            <div> <button onClick={(e) => postCar(e)}> Add car </button> </div>
        </div>

    )

}

