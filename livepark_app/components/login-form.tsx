import styles from './login-form.module.css'
import {Fragment, useState} from "react"

const LoginForm = () => {

    const API_USER_ADDUSER = "http://localhost:8080/api/user/adduser"
    const API_USER_ALLUSERS = "http://localhost:8080/api/user/allusers";
    const API_USER_ALLUSERS_1 = "http://localhost:8080/api/user/1";

    const [user, setUser] = useState({
        id: 0,
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event: any) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };

    const saveUser = async (event: any) => {
        console.log(JSON.stringify(user));
        event.preventDefault();
        const response = await fetch(API_USER_ADDUSER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            // mode: "no-cors",
            body: JSON.stringify(user),
        });

        console.log(response);
        console.log(response.status);
        const _user = await response.json();
        console.log(_user);
    };

    const allUsers = async (event: any) => {
        try {
            const response = await fetch(API_USER_ALLUSERS, {
                method: "GET",
                headers: {
                   "Content-Type": "application/json",
                   "Access-Control-Allow-Origin": "*"
                },
                // mode: "no-cors",
            });

            console.log(response);
            const user = await response.json();
            console.log(user);

        } catch (error) {
            console.log(error);
        }
    };

    const allUsers_1 = async (event: any) => {
        try {
            const response = await fetch(API_USER_ALLUSERS_1, {
                method: "GET",
                headers: {
                   "Content-Type": "application/json",
                   "Access-Control-Allow-Origin": "*",
                },
                // mode: "no-cors",
            });

            console.log(response);
            const user = await response.json();
            console.log(user);

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Login</h1>
            <div>
                <input 
                type="text" 
                name="username"
                onChange={(e) => handleChange(e)}
                value={user.username}/>
            </div>

            <div>
                <input 
                type="text" 
                name="email"
                onChange={(e) => handleChange(e)}
                value={user.email}/>
            </div>

            <div>
                <input 
                type="password" 
                name="password"
                onChange={(e) => handleChange(e)}
                value={user.password}/>
            </div>

            <button onClick={saveUser}> Login </button>
            <button onClick={allUsers}> AllUsers </button>
            <button onClick={allUsers_1}> AllUsers_1 </button>
            
        </div>
      );
}

export default LoginForm;