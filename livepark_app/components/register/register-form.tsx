import register_styles from './register-form.module.css'
import global_styles from '../global_module_css/global-form.module.css'
import {Fragment, useState} from "react"

import { GlobalConstants } from '../globalc_namespace/global-constants';

const RegisterForm = () => {
    
    const [registerUserRequest, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...registerUserRequest, [event.target.name]: value });
    };

    const registerUser = async (event: any) => {
        console.log(JSON.stringify(registerUserRequest));
        event.preventDefault();
        const response = await fetch(GlobalConstants.USER_SIGN_UP_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            // mode: "no-cors",
            body: JSON.stringify(registerUserRequest),
        });

        console.log(response);
        console.log(response.status);
        const _user = await response.json();
        console.log(_user);
    };

    return (
        <div className={global_styles.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Register</h1>
            <div>
                <input 
                type="text" 
                name="username"
                onChange={(e) => handleChange(e)}
                value={registerUserRequest.username}/>
            </div>

            <div>
                <input 
                type="text" 
                name="email"
                onChange={(e) => handleChange(e)}
                value={registerUserRequest.email}/>
            </div>

            <div>
                <input 
                type="password" 
                name="password"
                onChange={(e) => handleChange(e)}
                value={registerUserRequest.password}/>
            </div>

            <button onClick={registerUser}> Register </button>
            
        </div>
      );
}

export default RegisterForm;