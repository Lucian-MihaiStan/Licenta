import React, { ChangeEvent, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import { TextBoxDivForm } from '../html_components/textbox/textbox-register-login';
import common_login_styles from '../login_pages/common_login_modules/common-login.module.css'

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

    const postCar = async (event: any) => {
        event.preventDefault();
        addCarRequest.ownerId = localStorage.getItem(GlobalConstants.USER_ID) as string;
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

        console.log(localStorage.getItem(GlobalConstants.USER_ID));

        const _car = await response.json();
        console.log(_car);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setCar({ ...addCarRequest, [event.target.name]: value });
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

            {/* <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.FABRICATION_DATE}
                placeholder={InputConstants.FABRICATION_DATE_PLACEHOLDER}
                value={addCarRequest.fabricationDate}
                handleOnchange={handleChange}
            /> */}
    
            <div> <button onClick={(e) => postCar(e)}> Add car </button> </div>
        </div>

    )

}

