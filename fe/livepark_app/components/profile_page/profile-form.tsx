import React, { useEffect, useState } from "react";
import { ProfileProps } from "../html_components/props/Props";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";

export const ProfileForm = () => {

    const router = useRouter();
    const userId = router.query.userId;
    
    function change_password(): void {
        throw new Error("Function not implemented.");
    }

    function edit_profile(): void {
        throw new Error("Function not implemented.");
    }

    const [firstName, setFirstName] = useState("Loading...");
    const [lastName, setLastName] = useState("Loading...");
    const [username, setUsername] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const [profileFetched, setProfileFetched] = useState(false);

    const [file, setFile] = useState(new File([], ""));

    const [todo, setTodo] = useState({
        title: "ceva",
        description: "ceva",
    })

    
    
    const handleProfile = async () => {
        const url = `${GlobalConstants.USER_INFO_LINK}?userId=${userId}`;
        const _userinfo = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const _user = await _userinfo.json();

        setFirstName(_user[GlobalConstants.FIRST_NAME]);
        setLastName(_user[GlobalConstants.LAST_NAME]);
        setUsername(_user[GlobalConstants.USERNAME]);
        setEmail(_user[GlobalConstants.EMAIL]);
        setProfileFetched(true);
    }

    const handleSubmit = (e: any) => {
        // debugger
        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        
        const formData = new FormData();
        formData.append("file", file, file.name);

        async function uploadFile() {
            try {
                const response = await fetch("http://localhost:5002/insert_document", {
                    method: GlobalConstants.POST_REQUEST,
                    headers: {
                        "Access-Control-Allow-Origin": GlobalConstants.STAR,
                        "Content-Type": GlobalConstants.APPLICATION_JSON,
                        "Origin": GlobalConstants.FRONTEND_API_LINK,
                    },
                    body: JSON.stringify(todo),
                });
                
                const data = await response.json();
                console.log(data);

            } catch (error) {
                console.log(error);
            }

        }

        uploadFile();
    };

    const handleOnChange = (e: any) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (!profileFetched) 
            handleProfile();
    }, []);

    return (
        <div>
            <div>
                <p>Profile</p>
            </div>

            <div>
                <div>
                    <p>First Name</p>
                    {firstName}
                </div>
                
                <div>
                    <p>Last Name</p>
                    {lastName}
                </div>

                <div>
                    <p>Username</p>
                    {username}
                </div> 

                <div>
                    <p>Email</p>
                    {email}
                </div>
            </div>

            <div>
                <div>
                    <button onClick={e => change_password()}> Change Password </button>
                </div>
                
                <div>
                    <button onClick={e => edit_profile()}> Edit Profile </button>
                </div>

                <div>

                    <form action='form' onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <h3>Select your files</h3>
                            <input type="file" onChange={(e) => handleOnChange(e)}/>

                            <button className='btn btn-primary'> Send Files </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}