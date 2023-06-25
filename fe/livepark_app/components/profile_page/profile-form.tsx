import React, { useEffect, useRef, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../upload_document-form";
import Head from "next/head";
import classNames from 'classnames';
import { userInfo } from "os";

export const ProfileForm = () => {

    const router = useRouter();
    const userId = router.query.userId;
    
    const [firstName, setFirstName] = useState("Loading...");
    const [lastName, setLastName] = useState("Loading...");
    const [username, setUsername] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const [phoneNumber, setPhoneNumber] = useState("Loading...");

    const [gender, setGender] = useState("Unspecified");
    const [licenseId, setLicenseId] = useState("Loading...");
    const [IdentityCardId, setIdentityCardId] = useState("Loading...");

    const [pageFocused, setPageFocused] = useState(0);

    const newPassword = useRef<any>("*****");
    const confirmPassword = useRef<any>("*****");

    const [notMatchPass, setNotMatchPass] = useState(false);

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

        setIdentityCardId(_driverDTO[GlobalConstants.IDENTITY_CARD_ID] == null ? "Not uploaded" : _driverDTO[GlobalConstants.IDENTITY_CARD_ID]);
        setLicenseId(_driverDTO[GlobalConstants.LICENSE_ID] == null ? "Not uploaded" : _driverDTO[GlobalConstants.LICENSE_ID]);
        setGender(_driverDTO[GlobalConstants.GENDER]);
    }

    useEffect(() => {
        handleProfile();
    }, [userId]);

    function accountSelected(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();
        setPageFocused(0);
    }

    function passwordSelected(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();
        setPageFocused(1);
    }

    function driverSelected(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();
        setPageFocused(2);
    }

    async function changePassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.preventDefault();

        setNotMatchPass(false);

        if (newPassword?.current?.value != confirmPassword?.current?.value) {
            setNotMatchPass(true);
            return;
        }

        const _userinfo = await fetch(`${GlobalConstants.UPDATE_PASSWORD_LINK}`, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify({
                username: username,
                newPassword: newPassword?.current?.value
            })
        });

        if (!_userinfo.ok) {
            alert("Something went wrong. Please try again later.");
            return;
        }

        console.log("Updated");
        router.push(GlobalConstants.PROFILE + "/" + userId);
    }

    function updateProfile(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        throw new Error("Function not implemented.");
    }

    function cancelAction(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        throw new Error("Function not implemented.");
    }

    return (
        <>

        <Head>
            <title>Profile: ParkLive</title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="@/components/profile_page/styles/profile.module.css"/>
        </Head>

        <main>

        <div className={"enclosing_profile"}>
            <div className={"container"}>
                <br></br>
                <h1 className={"mb-5"}>Account Settings</h1>
                <div className={"shadow bg-white rounded-lg d-block d-sm-flex"}>
                    <div className={"profile-tab-nav border-right"}>
                        <div className={"p-4"}>
                            <h4 className={"text-center"}>{firstName} {lastName}</h4>
                        </div>

                        <div className={"nav-pills nav flex-column"} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className={classNames("nav-link", `${pageFocused == 0 ? "active" : ""}`)} onClick={(event) => accountSelected(event)}>
                                <i className={"fa fa-home text-center mr-1"}></i> 
                                Account
                            </a>
                            <a className={classNames("nav-link", `${pageFocused == 1 ? "active" : ""}`)} onClick={(event) => passwordSelected(event)}>
                                <i className={"fa fa-key text-center mr-1"}></i> 
                                Password
                            </a>
                            <a className={classNames("nav-link", `${pageFocused == 2 ? "active" : ""}`)} onClick={(event) => driverSelected(event)}>
                                <i className="fa fa-car text-center mr-1"></i>
                                Driver
                            </a>
                        </div>
                    </div>

                    <div className={"tab-content p-4 p-md-5"} id="v-pills-tabContent">

                        <div className={classNames("tab-pane fade show", `${pageFocused == 0 ? "active" : ""}`)}>
                            <h3 className={"mb-4"}>Account Settings</h3>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>First Name</label>
                                        <input type="text" className={"form-control"} value={firstName}/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Last Name</label>
                                        <input type="text" className={"form-control"} value={lastName}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Username</label>
                                        <input type="text" className={"form-control"} value={username}/>
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Email</label>
                                        <input type="text" className={"form-control"} value={email}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Phone number</label>
                                        <input type="text" className={"form-control"} value={phoneNumber}/>
                                    </div>
                                </div>

                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Gender</label>
                                        <input type="text" className={"form-control"} value={gender}/>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className={"btn btn-primary"} onClick={event => updateProfile(event)}>Update</button>
                                <button className={"btn btn-light"} onClick={event => cancelAction(event)}>Cancel</button>
                            </div>
                        </div>
                        
                        <div className={classNames("tab-pane fade show", `${pageFocused == 1 ? "active" : ""}`)}>
                            <h3 className={"mb-4"}>Password Settings</h3>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>New password</label>
                                        <input type="password" className={"form-control"} ref={newPassword}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Confirm new password</label>
                                        <input type="password" className={"form-control"} ref={confirmPassword}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className={"btn btn-primary"} onClick={event => changePassword(event)}>Update</button> 
                                <button className={"btn btn-light"} onClick={event => cancelAction(event)}>Cancel</button>
                            </div>
                        </div>

                        <div className={classNames("tab-pane fade show", `${pageFocused == 2 ? "active" : ""}`)}>
                            <h3 className={"mb-4"}>Driver Profile</h3>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>License ID</label>
                                        <input type="text" className={"form-control"} value={licenseId}/>
                                    </div>
                                </div>

                                <div className={"col-md-6"}>
                                    <div className={"form-group"}>
                                        <label>Identity Card</label>
                                        <input type="text" className={"form-control"} value={IdentityCardId}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </main>
        </>
    );
}