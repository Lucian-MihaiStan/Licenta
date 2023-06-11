import { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { InputConstants } from "@/components/globalc_namespace/inputc/input-constants";
import { TextBoxDivForm } from "@/components/html_components/textbox/textbox-register-login";
import Head from "next/head";
import { useRouter } from "next/router";

const ResetPassword: NextPage = () => {

    const router = useRouter();
    const token = router.query.token;
    const email = router.query.email;

    const passwordRef = useRef<any>(null);
    const confirmPasswordRef = useRef<any>(null);

    const resetPassword = async (event: any) => {
        event.preventDefault();

        const password = passwordRef.current?.getData();
        const confirmPassword = confirmPasswordRef.current?.getData();
        
        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return;
        }

        const response = await fetch(`${GlobalConstants.RESET_PASSWORD_LINK}?token=${token}&email=${email}&password=${password}`, {
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

    useEffect(() => {
        if (token == null)
            return;
    }, [token]);

    return (
        <>

        <Head>
            <title>Reset Password</title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <main>
            <div className="container">

                <form noValidate onSubmit={resetPassword}>

                    <div className="row">
                        <TextBoxDivForm
                            type={InputConstants.PASSWORD}
                            name={InputConstants.PASSWORD}
                            placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                            ref={passwordRef}
                        />
                    </div>

                    <div className="row">
                        <TextBoxDivForm
                            type={InputConstants.PASSWORD}
                            name={InputConstants.PASSWORD}
                            placeholder={InputConstants.CONFIRM_PASSWORD_PLACEHOLDER}
                            ref={confirmPasswordRef}
                        />
                    </div>

                    <button type="submit" className="btn btn-lg btn-primary btn-block">
                        Reset Password
                    </button>

                </form>
            </div>
        </main>    
        </>
    )
}

export default ResetPassword;