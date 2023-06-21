import common_login_styles from '../common_login_modules/common-login.module.css'
import {HTMLInputTypeAttribute, useImperativeHandle, useRef, useState} from "react"

import { GlobalConstants } from '../../globalc_namespace/global-constants';
import { InputConstants } from '../../globalc_namespace/inputc/input-constants';

import {TextBoxDivForm} from '../../html_components/textbox/textbox-register-login';
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Head from 'next/head';

export const RegisterForm = () => {

    const routerUtils = useRouter();

    const firstNameRef = useRef<any>(null);
    const lastNameRef = useRef<any>(null);
    const usernameRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null); 
    const [isChecked, setChecked] = useState(true);

    const registerUser = async (event: any) => {

        if (!isChecked)
            return;

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
        <>
        <Head>
            <title> Register: LivePark </title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <div className={classNames("container-fluid")}>
            <div className={classNames("row")}>
                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.left_div)}>
                               
                    <h3 className={common_login_styles.underline_title}>Create Account</h3>

                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.FIRST_NAME} 
                        placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                        ref={firstNameRef}
                    />


                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.LAST_NAME}
                        placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                        ref={lastNameRef}
                    />

                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.USERNAME}
                        placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                        ref={usernameRef}
                    />  

                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.EMAIL}
                        placeholder={InputConstants.EMAIL_PLACEHOLDER} 
                        ref={emailRef}
                    />

                    <TextBoxDivForm 
                        type={InputConstants.PASSWORD_TYPE} 
                        name={InputConstants.PASSWORD} 
                        placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                        ref={passwordRef}
                    />

                    <div>
                        <input
                            type="checkbox"
                            id="readTCons"
                            checked={isChecked}
                            onChange={(event) => setChecked(event.target.checked)}
                        />
                        <label className={common_login_styles.label_terms} htmlFor="readTCons">Agree with our <a className={common_login_styles.a_terms} onClick={(event) => routeToPage(event, GlobalConstants.TERMS_CONS)}> Terms and Conditions </a> </label>
                    </div>

                    <button className={classNames('btn btn-success', common_login_styles.button_parklive, common_login_styles.button_login_forgot, common_login_styles.signin)} onClick={event => registerUser(event)}> Sign Up </button> 


                </div>

                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.right_div)}>
                    <div>
                        <div>
                            <div className={common_login_styles.title_parklive}> ParkLive </div>

                            <div> Don't have an account? </div>
                            <div> Login here </div>
                        </div>
                        <button className={classNames('btn btn-light btn-lg', common_login_styles.button_parklive)} onClick={(e) => routeToPage(e, GlobalConstants.LOGIN_FRONTEND_APP_LINK)}> Sign In</button>
                    </div>
                </div>

            </div>

        </div>
        </>
      );
}
