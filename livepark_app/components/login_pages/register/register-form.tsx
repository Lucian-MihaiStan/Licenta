import common_login_styles from '../common_login_modules/common-login.module.css'
import register_styles from './register-form.module.css'
import global_styles from '../global_module_css/global-form.module.css'
import {useState} from "react"

import { GlobalConstants } from '../../globalc_namespace/global-constants';
import { InputConstants } from '../../globalc_namespace/inputc/input-constants';

import {TextBoxDivForm} from '../../html_components/textbox/textbox-register-login';
import { Utils } from '@/components/utils/utils';
import { useRouter } from 'next/router';

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

    const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    return (
        <div className={common_login_styles.loginmaindiv}>
          <h1 
        //   className={ register_styles.create_account_title }
          >Create Account</h1>

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.FIRST_NAME} 
                placeholder={InputConstants.FIRST_NAME_PLACEHOLDER}
                value={registerUserRequest.firstName} 
                handleOnchange={handleChange}
            />

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.LAST_NAME}
                placeholder={InputConstants.LAST_NAME_PLACEHOLDER}
                value={registerUserRequest.lastName} 
                handleOnchange={handleChange}
            />

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.USERNAME}
                placeholder={InputConstants.USERNAME_PLACEHOLDER} 
                value={registerUserRequest.username} 
                handleOnchange={handleChange}
            />

            <TextBoxDivForm 
                type={InputConstants.TEXT_TYPE} 
                name={InputConstants.EMAIL}
                placeholder={InputConstants.EMAIL_PLACEHOLDER} 
                value={registerUserRequest.email} 
                handleOnchange={handleChange}
            />

            <TextBoxDivForm 
                type={InputConstants.PASSWORD_TYPE} 
                name={InputConstants.PASSWORD} 
                placeholder={InputConstants.PASSWORD_PLACEHOLDER}
                value={registerUserRequest.password} 
                handleOnchange={handleChange}
            />

            <div>
                <button onClick={registerUser}> Sign Up </button>
            </div>
            
            <div>
                <div>
                    <span> Don't have an account? </span>
                </div>
                <button onClick={(e) => routeToPage(e, GlobalConstants.LOGIN_FRONTEND_APP_LINK)}> Sign In</button>
            </div>
            
        </div>
      );
}
