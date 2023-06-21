import common_login_styles from '../common_login_modules/common-login.module.css'

import { GlobalConstants } from '@/components/globalc_namespace/global-constants';
import { TextBoxDivForm } from "@/components/html_components/textbox/textbox-register-login";
import { InputConstants } from "@/components/globalc_namespace/inputc/input-constants";
import { useRef } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import classNames from 'classnames';

export const LoginForm = () => {

    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const loginUser = async (event: any) => {
        event.preventDefault();

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
            const token_data = _user[GlobalConstants.TOKEN];
            const userId_data = _user[GlobalConstants.USER_ID];
            const userRole_data = _user[GlobalConstants.USER_ROLE];

            localStorage.setItem(GlobalConstants.TOKEN, token_data);
            localStorage.setItem(GlobalConstants.USER_ID, userId_data);
            localStorage.setItem(GlobalConstants.USER_ROLE, userRole_data);

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

    function forgotPassword(event: any): void {
        event.preventDefault();
        routerUtils.push(GlobalConstants.FORGOT_PASSWORD);
    }

    return (
        <>
        <Head>
            <title> Login: LivePark </title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <div className={classNames("container-fluid")}>
            <div className={classNames("row")}>
                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.left_div)}>
                    <h3 className={common_login_styles.underline_title}>Login to Your Account</h3>

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

                    <div className="row">
                        <button className={classNames('btn btn-success', common_login_styles.button_parklive, common_login_styles.button_login_forgot, common_login_styles.signin)} onClick={event => loginUser(event)}> Sign In </button> 
                        <button className={classNames('btn btn-secondary', common_login_styles.button_parklive, common_login_styles.button_login_forgot)} onClick={event => forgotPassword(event)} > Forgot Password </button>
                    </div>
                </div>
                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.right_div)}>
                        <div>
                            <div className={common_login_styles.title_parklive}> ParkLive </div>

                            <div> New here? </div>
                            <div> Sign up and discover </div>
                            <div> a great amount of opportunities to </div>
                            <div> park you car and </div>
                            <div> safely store your documents! </div>
                        </div>
                        <button className={classNames('btn btn-light btn-lg', common_login_styles.button_parklive)} onClick={(e) => routeToPage(e, GlobalConstants.REGISTER_FRONTEND_APP_LINK)}> Sign Up </button>
                </div>
            </div>
        </div> 

        </>
      );
}

