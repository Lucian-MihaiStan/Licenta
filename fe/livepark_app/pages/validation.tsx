import { useRouter } from "next/router";
import React, { useEffect } from "react"
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { NextPage } from "next";

const Validation: NextPage = () => {

    const routerUtils = useRouter();
    const token = routerUtils.query.token;

    const postValidation = async () => {
        console.log(token);
        const url = `${GlobalConstants.VALIDATION_LINK}?token=${token}`;
        console.log(url);
        const response = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + token
            }
        });
        
        if (response.ok) 
            routerUtils.push(GlobalConstants.LOGIN_FRONTEND_APP_LINK);
        else
            alert("Failed");
    }

    useEffect(() => {
        if (token == null || token == 'no data' || token == 'undefined')
            return;
        postValidation();    
    }, [token]);

    return (
        <div>
            <h1>Validation</h1>
        </div>
    )
}

export default Validation;
