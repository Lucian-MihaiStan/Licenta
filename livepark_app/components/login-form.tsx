import styles from './login-form.module.css'
import {Fragment, useState} from "react"

const LoginForm = () => {

    const API_USER_SIGN_UP = "http://localhost:8080/api/auth/signup";
    const API_USER_ALL_USERS = "http://localhost:8080/api/auth/allusers";


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
        const response = await fetch(API_USER_SIGN_UP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Origin": "http://localhost:3000",
            },
            // mode: "no-cors",
            body: JSON.stringify(registerUserRequest),
        });

        console.log(response);
        console.log(response.status);
        const _user = await response.json();
        console.log(_user);
    };

    const getUsers = async (event: any) => {
        event.preventDefault();
        const response = await fetch(API_USER_ALL_USERS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        console.log(response);
        console.log(response.status);
        const _users = await(response.json());
        console.log(_users);
    };

    return (
        <div className={styles.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Login</h1>
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
            <button onClick={getUsers}> AllUsers </button>
            
        </div>
      );
}

export default LoginForm;