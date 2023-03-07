import login_styles from "./login-form.module.css"
import global_styles from '../global_module_css/global-form.module.css'
import {Fragment, useState} from "react"

import { GlobalConstants } from '../globalc_namespace/global-constants';

const LoginForm = () => {

    const [loginUserRequest, setUser] = useState({
        username: "",
        password: "",
    });

    const loginUser = async (event: any) => {
        console.log(JSON.stringify(loginUserRequest));
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

        console.log(response);
        console.log(response.status);
        const _user = await response.json();
        console.log(_user);
    }

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...loginUserRequest, [event.target.name]: value });
    };

    return (
        <div className={global_styles.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Register</h1>
            <div>
                <input 
                type="text" 
                name="username"
                onChange={(e) => handleChange(e)}
                value={loginUserRequest.username}/>
            </div>

            <div>
                <input 
                type="password" 
                name="password"
                onChange={(e) => handleChange(e)}
                value={loginUserRequest.password}/>
            </div>

            <button onClick={loginUser}> Login </button>            
        </div>
      );
}

export default LoginForm;