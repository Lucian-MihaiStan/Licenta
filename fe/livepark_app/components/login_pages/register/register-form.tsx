import common_login_styles from '../common_login_modules/common-login.module.css'
import {HTMLInputTypeAttribute, useImperativeHandle, useRef, useState} from "react"

import { GlobalConstants } from '../../globalc_namespace/global-constants';
import { InputConstants } from '../../globalc_namespace/inputc/input-constants';

import {TextBoxDivForm} from '../../html_components/textbox/textbox-register-login';
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';

export const RegisterForm = () => {

    const routerUtils = useRouter();

    const firstNameRef = useRef<any>(null);
    const lastNameRef = useRef<any>(null);
    const usernameRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const registerUser = async (event: any) => {
        event.preventDefault();
        if (!EmailValidator.validate(emailRef.current?.getData()))
            return;
        
        const response = await fetch(GlobalConstants.USER_SIGN_UP_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify({
                firstName: firstNameRef.current?.getData(),
                lastName: lastNameRef.current?.getData(),
                username: usernameRef.current?.getData(),
                email: emailRef.current?.getData(),
                password: passwordRef.current?.getData()
            }),
        });

        const _user = await response.json();
        console.log(_user);
        if (response.ok)
            routerUtils.push(GlobalConstants.LOGIN_FRONTEND_APP_LINK);
        else
            console.log("Failed");
    };

    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    return (
        <div className={common_login_styles.loginmaindiv}>
          <h1>Create Account</h1>

        <form onSubmit={registerUser}>

            <div>
                <TextBoxDivForm 
                    type={InputConstants.TEXT_TYPE} 
                    name={InputConstants.FIRST_NAME} 
                    placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                    ref={firstNameRef}
                />

            </div>

            <div>
                <TextBoxDivForm 
                    type={InputConstants.TEXT_TYPE} 
                    name={InputConstants.LAST_NAME}
                    placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                    ref={lastNameRef}
                />
            </div>

            <div>
                <TextBoxDivForm 
                    type={InputConstants.TEXT_TYPE} 
                    name={InputConstants.USERNAME}
                    placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                    ref={usernameRef}
                />  
            </div>

            <div>
                <TextBoxDivForm 
                    type={InputConstants.TEXT_TYPE} 
                    name={InputConstants.EMAIL}
                    placeholder={InputConstants.EMAIL_PLACEHOLDER} 
                    ref={emailRef}
                />
            </div>

            <div>
                <TextBoxDivForm 
                    type={InputConstants.PASSWORD_TYPE} 
                    name={InputConstants.PASSWORD} 
                    placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                    ref={passwordRef}
                />
            </div>

            
            <input type="submit" title='Sign Up '/> 
            
        </form>
        <div>
            <div>
                <span> Don't have an account? </span>
            </div>
            <button onClick={(e) => routeToPage(e, GlobalConstants.LOGIN_FRONTEND_APP_LINK)}> Sign In</button>
        </div>
        </div>
      );
}
