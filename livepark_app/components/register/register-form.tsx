import register_styles from './register-form.module.css'
import global_styles from '../global_module_css/global-form.module.css'
import {useState} from "react"

import { GlobalConstants } from '../globalc_namespace/global-constants';
import { type } from 'os';
import { InputConstants } from '../globalc_namespace/inputc/input-constants';

import {TextBoxDivFrom} from '../html_components/textbox-div';


export const RegisterForm = () => {
    
    const [registerUserRequest, setUser] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...registerUserRequest, [event.target.name]: value });
    };

    const registerUser = async (event: any) => {
        event.preventDefault();
        const response = await fetch(GlobalConstants.USER_SIGN_UP_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify(registerUserRequest),
        });

        const _user = await response.json();
        console.log(_user);
    };

    return (
        <div className={global_styles.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Create Account</h1>

            <TextBoxDivFrom 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.USERNAME}
                placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                value={registerUserRequest.username} 
                handleOnchange={handleChange}
            />

            <TextBoxDivFrom 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.EMAIL}
                placeholder={InputConstants.EMAIL_PLACEHOLDER} 
                value={registerUserRequest.email} 
                handleOnchange={handleChange}
            />

            <TextBoxDivFrom 
                type={InputConstants.PASSWORD_TYPE} 
                name={InputConstants.PASSWORD} 
                placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                value={registerUserRequest.password} 
                handleOnchange={handleChange}
            />

            <TextBoxDivFrom 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.FIRST_NAME} 
                placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                value={registerUserRequest.firstName} 
                handleOnchange={handleChange}
            />

            <TextBoxDivFrom 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.LAST_NAME}
                placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                value={registerUserRequest.lastName} 
                handleOnchange={handleChange}
            />

            <button onClick={registerUser}> Sign Up </button>
            
        </div>
      );
}
