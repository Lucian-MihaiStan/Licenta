import React, { ChangeEvent, useRef, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import { TextBoxDivForm } from '../html_components/textbox/textbox-register-login';
import common_login_styles from '../login_pages/common_login_modules/common-login.module.css'
import { useRouter } from "next/router";

export const AddCarForm = () => {

    const plateRef = useRef<any>(null);
    const vinRef = useRef<any>(null);
    const brandRef = useRef<any>(null);
    const modelRef = useRef<any>(null);
    const fabricationDateRef = useRef<any>(null); 

    const userId = localStorage.getItem(GlobalConstants.USER_ID) as string;
    const routerUtils = useRouter();

    const postCar = async (event: any) => {
        event.preventDefault();
        const response = await fetch(GlobalConstants.ADD_CAR_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN) 
            },
            body: JSON.stringify({
                ownerId: userId,
                plate: plateRef.current?.getData(),
                vin: vinRef.current?.getData(),
                brand: brandRef.current?.getData(),
                model: modelRef.current?.getData(),
                fabricationDate: fabricationDateRef.current?.getData(),
            })
        });

        const _car = await response.json();
        console.log(_car);
        if (response.ok) {
            routerUtils.push(GlobalConstants.CARS + "/" + userId);
        }
    }

    return (
        <div className={common_login_styles.loginmaindiv}>
            <div> <h1> Add car </h1> </div>

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.PLATE}
                placeholder={InputConstants.CAR_PLATE_PLACEHOLDER}
                ref={plateRef}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.VIN}
                placeholder={InputConstants.VIN_PLACEHOLDER}
                ref={vinRef}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.BRAND}
                placeholder={InputConstants.BRAND_PLACEHOLDER}
                ref={brandRef}
            />

            <TextBoxDivForm
                type={InputConstants.TEXT_TYPE}
                name={InputConstants.MODEL}
                placeholder={InputConstants.MODEL_PLACEHOLDER}
                ref={modelRef}
            />
           
            <TextBoxDivForm
                type={InputConstants.DATE}
                name={InputConstants.FABRICATION_DATE}
                placeholder={InputConstants.FABRICATION_DATE_PLACEHOLDER}
                ref={fabricationDateRef}
            />

            <div> <button onClick={(e) => postCar(e)}> Add car </button> </div>
        </div>

    )

}

