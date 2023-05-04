import React, { useEffect, useState } from "react";
import { ProfileProps } from "../html_components/props/Props";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { debug } from "console";

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

    const [gender, setGender] = useState("Unspecified");
    const [licenseId, setLicenseId] = useState("Loading...");
    const [IdentityCardId, setIdentityCardId] = useState("Loading...");

    const [cardIdentity, setCardIdentity] = useState(new File([], ""));
    const [drivingLicense, setDrivingLicense] = useState(new File([], ""));

    const todo = useState({
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
        
        const _userDTO = _user[GlobalConstants.USER_DTO];
        const _driverDTO = _user[GlobalConstants.DRIVER_DTO];

        setFirstName(_userDTO[GlobalConstants.FIRST_NAME]);
        setLastName(_userDTO[GlobalConstants.LAST_NAME]);
        setUsername(_userDTO[GlobalConstants.USERNAME]);
        setEmail(_userDTO[GlobalConstants.EMAIL]);

        // debugger;
        setIdentityCardId(_driverDTO[GlobalConstants.IDENTITY_CARD_ID]);
        setLicenseId(_driverDTO[GlobalConstants.LICENSE_ID]);
        setGender(_driverDTO[GlobalConstants.GENDER]);

        setProfileFetched(true);
    }

    const handleSubmit = (e: any, url: string) => {
        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        
        // const formData = new FormData();
        // formData.append("file", cardIdentity, cardIdentity.name);

        async function uploadFile() {
            try {
                const response = await fetch(GlobalConstants.ADD_DOCUMENT_LINK, {
                    method: GlobalConstants.POST_REQUEST,
                    headers: {
                        "Access-Control-Allow-Origin": GlobalConstants.STAR,
                        "Content-Type": GlobalConstants.APPLICATION_JSON,
                        "Origin": GlobalConstants.FRONTEND_API_LINK,
                    },
                    body: JSON.stringify(todo),
                });
                
                const data = await response.json();
                // debugger
                if (data['document_id'] == null) {
                    alert("Document not inserted");
                    return;
                }
                    
                const document_id = data['document_id'];

                const dataJson = {
                    cardId: document_id,
                    userId: userId,
                };

                const responsePost = await fetch(url, {
                    method: GlobalConstants.POST_REQUEST,
                    headers: {
                        "Content-Type": GlobalConstants.APPLICATION_JSON,
                        "Access-Control-Allow-Origin": GlobalConstants.STAR,
                        "Origin": GlobalConstants.FRONTEND_API_LINK,
                        "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                        },
                    body: JSON.stringify(dataJson),
                });

                const dataPost = await responsePost.json();
                if (dataPost['posted'] == false) {
                    alert("Document not posted");
                    return;
                }

            } catch (error) {
                console.log(error);
            }

        }

        uploadFile();
    };

    const handleOnChange = (e: any, isCard: boolean) => {
        console.log(e.target.files[0]);
        if (isCard)
            setCardIdentity(e.target.files[0]);
        else
            setDrivingLicense(e.target.files[0]);
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

                <div>
                    <p>Gender</p>
                    {gender}
                </div>

                <div>
                    <p>License Id</p>
                    {licenseId}
                </div>

                <div>
                    <p>Identity Card Id</p>
                    {IdentityCardId}
                </div>
                
            </div>

            <div>
                <div>
                    <button onClick={() => change_password()}> Change Password </button>
                </div>
                
                <div>
                    <button onClick={() => edit_profile()}> Edit Profile </button>
                </div>

                <div>
                    <form action='form' onSubmit={(e) => handleSubmit(e, GlobalConstants.POST_ID_CARD_LINK)}>
                        <div>
                            <h3>Upload Identity Card</h3>
                            <input type="file" onChange={(e) => handleOnChange(e, true)}/>
                            <button className='btn btn-primary'> Send Files </button>
                        </div>
                    </form>
                </div>

                <div>
                    <form action="form" onSubmit={(e) => handleSubmit(e, GlobalConstants.POST_LICENSE_CARD_LINK)}>
                        <div>
                            <h3>Upload License Card</h3>
                            <input type="file" onChange={(e) => handleOnChange(e, false)}/>
                            <button className='btn btn-primary'> Send Files </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}