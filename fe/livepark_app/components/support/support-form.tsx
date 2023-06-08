import { useRef } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { TextBoxDivForm } from "../html_components/textbox/textbox-register-login";
import { InputConstants } from "../globalc_namespace/inputc/input-constants";
import textBoxStyles from '../html_components/textbox/textbox_module_css/textbox.module.css'

export const SupportForm = (): JSX.Element => {

    const fFirstName = useRef<any>(null);
    const fLastName = useRef<any>(null);
    const fEmail = useRef<any>(null);
    const fSubject = useRef<any>(null);
    const fMessage = useRef<any>(null);

    const router = useRouter();

    const sendMessage = async (event: any) => {
        event.preventDefault();

        const fname = fFirstName.current?.value;
        const lname = fLastName.current?.value;
        const email = fEmail.current?.value;
        const subject = fSubject.current?.value;
        const message = fMessage.current?.value;

        const send_data = await fetch(GlobalConstants.SUPPORT_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                email: email,
                subject: subject,
                message: message
            }),
        });

        const result = await send_data.json();

        if (result.ok) {
            alert("Message sent successfully!");
            router.push(GlobalConstants.DASHBOARD);
        } else {
            alert("Message was not sent!");
        }
    }

    return (
        <div>
            
            <form onSubmit={sendMessage}>

                <div>
                    <TextBoxDivForm 
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.FIRST_NAME} 
                        placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                        ref={fFirstName}
                    />
                </div>
                
                <div>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE} 
                        name={InputConstants.LAST_NAME}
                        placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                        ref={fLastName}
                    />
                </div>

                <div>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name={InputConstants.EMAIL}
                        placeholder={InputConstants.EMAIL_PLACEHOLDER}
                        ref={fEmail}
                    />
                </div>

                <div>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name={InputConstants.SUBJECT}
                        placeholder={InputConstants.SUBJECT}
                        ref={fSubject}
                    />
                </div>

                <div className={textBoxStyles.custom_field}>
                    <textarea  id="message" name="message" ref={fMessage}></textarea>
                    <span className={textBoxStyles.placeholder}>Text</span>
                </div>
                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}

