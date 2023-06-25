import Head from "next/head"
import React from "react"
import { InputConstants } from "@/components/globalc_namespace/inputc/input-constants"
import { TextBoxDivForm } from "@/components/html_components/textbox/textbox-register-login";
import { NextPage } from "next";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { useRouter } from "next/router";
import common_login_styles from "@/components/login_pages/common_login_modules/common-login.module.css";
import classNames from "classnames";

const ForgotPassword: NextPage = () => {

    const emailRef = React.useRef<any>(null);
    const router = useRouter();

    const forgotPassword = async (event: any) => {
        event.preventDefault();
        
        const response = await fetch(`${GlobalConstants.FORGOT_PASSWORD_LINK}?email=${emailRef.current?.getData()}`, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        if (!response.ok) {
            alert("Failed");
            console.log("Failed");
            return;
        }

        router.push(GlobalConstants.LOGIN);
    }

    function routeToPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, link: string): void {
        e.preventDefault();
        router.push(link);
    }

    return (
        <>
        <Head>
            <title>Forgot Password: ParkLive</title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>
        <div className={classNames("container-fluid")}>
            <div className={classNames("row")}>
                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.left_div)}>
                    <h3 className={common_login_styles.underline_title}>Forgot Password</h3>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name={InputConstants.EMAIL}
                        placeholder={InputConstants.EMAIL_PLACEHOLDER}
                        ref={emailRef}
                    />

                    <div className="row">
                        <button className={classNames('btn btn-success', common_login_styles.button_parklive, common_login_styles.button_login_forgot, common_login_styles.signin)} onClick={event => forgotPassword(event)}> Send Email </button>
                    </div>
                </div>

                <div className={classNames("col", common_login_styles.loginmaindiv, common_login_styles.right_div)}>
                        <div>
                            <div className={common_login_styles.title_parklive}> ParkLive </div>
                        </div>

                        <button className={classNames('btn btn-light btn-lg', common_login_styles.button_parklive)} onClick={(e) => routeToPage(e, GlobalConstants.REGISTER_FRONTEND_APP_LINK)}> Sign Up </button>
                        <button className={classNames('btn btn-light btn-lg', common_login_styles.button_parklive)} onClick={(e) => routeToPage(e, GlobalConstants.LOGIN_FRONTEND_APP_LINK)}> Sign In</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ForgotPassword;