import React, { useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../upload_document-form";

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

        setIdentityCardId(_driverDTO[GlobalConstants.IDENTITY_CARD_ID]);
        setLicenseId(_driverDTO[GlobalConstants.LICENSE_ID]);
        setGender(_driverDTO[GlobalConstants.GENDER]);

        setProfileFetched(true);
    }

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

                <UploadDocumentForm
                    userId={userId as string}
                    document_name={UploadDocumentFormNamespace.IDENTITY_CARD}
                    url={GlobalConstants.POST_ID_CARD_LINK}/>

                <UploadDocumentForm
                    userId={userId as string}
                    document_name={UploadDocumentFormNamespace.DRIVING_LICENSE}
                    url={GlobalConstants.POST_LICENSE_CARD_LINK}/>
                
            </div>
        </div>
    );
}