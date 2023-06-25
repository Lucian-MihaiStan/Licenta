import { useRef } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { TextBoxDivForm } from "../html_components/textbox/textbox-register-login";
import { InputConstants } from "../globalc_namespace/inputc/input-constants";
import textBoxStyles from '../html_components/textbox/textbox_module_css/textbox.module.css'
import support_style from './support_styles/support_styles.module.css'
import Head from "next/head";
import classNames from "classnames";

export const SupportForm = (): JSX.Element => {

    const fFirstName = useRef<any>(null);
    const fLastName = useRef<any>(null);
    const fEmail = useRef<any>(null);
    const fSubject = useRef<any>(null);
    const fMessage = useRef<any>(null);

    const router = useRouter();

    const sendMessage = async (event: any) => {
        event.preventDefault();

        const fname = fFirstName.current?.getData();
        const lname = fLastName.current?.getData();
        const email = fEmail.current?.getData();
        const subject = fSubject.current?.getData();
        const message = fMessage.current?.value;

        const send_data = await fetch(GlobalConstants.SUPPORT_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK
            },
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                email: email,
                subject: subject,
                message: message
            }),
        });

        if (send_data.ok) {
            alert("Message sent successfully!");
            router.push(GlobalConstants.DASHBOARD);
        } else {
            alert("Message was not sent!");
        }
    }

    return (
        <>
        
        <Head>
            <link rel="icon" href="public/favicon.ico" />
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>            
        </Head>
        
        <div className={classNames("container-fluid")}>

        <div className={classNames("row")}>
            <div className={classNames("col", support_style.div_form)}>
                
                <div className={classNames(support_style.one_input)}>
                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.FIRST_NAME} 
                        placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                        ref={fFirstName}
                    />
                </div>              


                <div className={classNames(support_style.one_input)}>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.LAST_NAME}
                        placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                        ref={fLastName}
                    />
                </div>

                <div className={classNames(support_style.one_input)}>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name={InputConstants.EMAIL}
                        placeholder={InputConstants.EMAIL_PLACEHOLDER}
                        ref={fEmail}
                    />
                </div>

                <div className={classNames(support_style.one_input)}>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name={InputConstants.SUBJECT}
                        placeholder={InputConstants.SUBJECT}
                        ref={fSubject}
                    />
                </div>

            </div>

            <div className={classNames("col", support_style.div_form)}>
                <div>
                    <textarea  id="message" name="message" ref={fMessage}></textarea>
                    <span className={textBoxStyles.placeholder}>Text</span>
                </div>
                
                <button className={classNames("btn btn-dark")}> Send! </button>

            </div>


        </div>

        </div>
        </>
    )
}

