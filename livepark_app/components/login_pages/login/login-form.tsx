import login_styles from "./login-form.module.css"
import common_login_styles from '../common_login_modules/common-login.module.css'
import global_styles from '../global_m odule_css/global-form.module.css'
import {useState} from "react"

import { GlobalConstants } from '../../globalc_namespace/global-constants';
import { TextBoxDivForm } from "../../html_components/textbox/textbox-register-login";
import { InputConstants } from "../../globalc_namespace/inputc/input-constants";

export const LoginForm = () => {

    const [loginUserRequest, setUser] = useState({
        username: "",
        password: "",
    });

    const loginUser = async (event: any) => {
        event.preventDefault();
        
        const response = await fetch(GlobalConstants.USER_SIGN_IN_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify(loginUserRequest),
        });

        const _user = await response.json();
        console.log(_user);
    }

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...loginUserRequest, [event.target.name]: value });
    };

    return (
        <div className={common_login_styles.loginmaindiv}>
          <h1 className="display-6 mb-3">Login to Your Account</h1>

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.USERNAME} 
                placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                value={loginUserRequest.username} 
                handleOnchange={handleChange}
            />
            
            
            <TextBoxDivForm 
                type={InputConstants.PASSWORD_TYPE} 
                name={InputConstants.PASSWORD} 
                placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                value={loginUserRequest.password} 
                handleOnchange={handleChange}
            />

            <button onClick={loginUser}> Sign In </button>            
        </div>
      );
}
