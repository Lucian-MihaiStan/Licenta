import common_login_styles from '../common_login_modules/common-login.module.css'

import { GlobalConstants } from '../../globalc_namespace/global-constants';
import { TextBoxDivForm } from "../../html_components/textbox/textbox-register-login";
import { InputConstants } from "../../globalc_namespace/inputc/input-constants";
import { useRef, useState } from "react";
import { useRouter } from "next/router";


export const LoginForm = () => {

    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const loginUser = async (event: any) => {
        event.preventDefault();

        console.log(usernameRef.current?.getData());
        console.log(passwordRef.current?.getData());

        const response = await fetch(GlobalConstants.USER_SIGN_IN_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify({
                username: usernameRef.current?.getData(),
                password: passwordRef.current?.getData()
            }),
        });

        const _user = await response.json();
        if (authentificationSuccesfully(_user)) {
            console.log("Successfully");
            
            const token_data = _user[GlobalConstants.TOKEN];
            const userId_data = _user[GlobalConstants.USER_ID];

            localStorage.setItem(GlobalConstants.TOKEN, token_data);
            localStorage.setItem(GlobalConstants.USER_ID, userId_data);

            routerUtils.push(GlobalConstants.DASHBOARD);

        } else {
            // TODO Lucian here you have to clear the user and password field
            console.log("Failed");
        }
        
    }

    const authentificationSuccesfully = (login_response: any) : boolean => {
        return login_response != null && 
                login_response[GlobalConstants.TOKEN] != null &&
                login_response[GlobalConstants.USER_ID] != null;
    } 
    
    const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    return (
        <div className={common_login_styles.loginmaindiv}>
          <h1 className="display-6 mb-3">Login to Your Account</h1>

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.USERNAME} 
                placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                ref={usernameRef}
            />
            
            
            <TextBoxDivForm 
                type={InputConstants.PASSWORD_TYPE} 
                name={InputConstants.PASSWORD} 
                placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                ref={passwordRef}
            />

            <div>
                <button onClick={loginUser}> Sign In </button>            
            </div>

            <div>
                <div>
                    <div> New here? </div>
                    <div> Sign up and discover a great </div>
                    <div> amount of opportunities to </div>
                    <div> park you car </div>
                </div>
                <button onClick={(e) => routeToPage(e, GlobalConstants.REGISTER_FRONTEND_APP_LINK)}> Sign Up </button>
            </div>
        </div>
      );
}

