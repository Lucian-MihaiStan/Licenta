import Head from "next/head"
import React from "react"
import { InputConstants } from "@/components/globalc_namespace/inputc/input-constants"
import { TextBoxDivForm } from "@/components/html_components/textbox/textbox-register-login";
import { NextPage } from "next";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { useRouter } from "next/router";

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

    return (
        <>
        <Head>
            <title>Forgot Password</title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={forgotPassword}>
                            <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
                            <div className="form-group">
                                <TextBoxDivForm
                                    type={InputConstants.TEXT_TYPE}
                                    name={InputConstants.EMAIL}
                                    placeholder={InputConstants.EMAIL_PLACEHOLDER}
                                    ref={emailRef}
                                />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default ForgotPassword;