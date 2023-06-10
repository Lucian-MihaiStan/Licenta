import React, { useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { UploadDocumentForm, UploadDocumentFormNamespace } from "../upload_document-form";
import Head from "next/head";
import classNames from 'classnames';

import styles from './styles/profile.module.css';

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
    }, [userId]);

    return (
        <>

        <Head>
            <title>Profile</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="@/components/profile_page/styles/"/>
        </Head>

        <main>

        <div className={classNames(styles["enclosing_profile"])}>
            <div className={"container"}>
                <h1 className={"mb-5"}>Account Settings</h1>
            
            
                <div className={classNames(styles["shadow"], "bg-white rounded-lg d-block d-sm-flex")}>
                    <div className={classNames(styles["profile-tab-nav"], "border-right")}>
                        <div className={"p-4"}>
                            <h4 className={"text-center"}>{firstName} {lastName}</h4>
                        </div>

                        <div className={"nav-pills nav flex-column"} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className={classNames(styles["nav-link"], "active")} id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                                <i className={"fa fa-home text-center mr-1"}></i> 
                                Account
                            </a>
                            <a className={classNames(styles["nav-link"])} id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                                <i className={"fa fa-key text-center mr-1"}></i> 
                                Password
                            </a>
                        </div>

                        <div className={classNames(styles["tab-content"], "p-4 p-md-5")} id="v-pills-tabContent">
                            <div className={"tab-pane fade show active"} id="account" role="tabpanel" aria-labelledby="account-tab">
                                <h3 className={"mb-4"}>Account Settings</h3>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <div className={styles["form-group"]}>
                                            <label>First Name</label>
                                            <input type="text" className={"form-control"} value="Kiran"/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={styles["form-group"]}>
                                            <label>Last Name</label>
                                            <input type="text" className={"form-control"} value="Acharya"/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={styles["form-group"]}>
                                            <label>Email</label>
                                            <input type="text" className={styles["form-control"]} value="kiranacharya287@gmail.com"/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={styles["form-group"]}>
                                            <label>Phone number</label>
                                            <input type="text" className={styles["form-control"]} value="+91 9876543215"/>
                                        </div>
                                    </div>
                                    
                                    <div className={"col-md-12"}>
                                        <div className={styles["form-group"]}>
                                            <label>Bio</label>
                                            <textarea className={"form-control"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!</textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <button className={"btn btn-primary"}>Update</button>
                                        <button className={"btn btn-light"}>Cancel</button>
                                    </div>
                                </div>
                                <div className={"tab-pane fade"} id="password" role="tabpanel" aria-labelledby="password-tab">
                                    <h3 className={"mb-4"}>Password Settings</h3>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <div className={styles["form-group"]}>
                                                <label>Old password</label>
                                                <input type="password" className={styles["form-control"]}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <div className={styles["form-group"]}>
                                                <label>New password</label>
                                                <input type="password" className={styles["form-control"]}/>
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className={styles["form-group"]}>
                                                <label>Confirm new password</label>
                                                <input type="password" className={styles["form-control"]}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className={"btn btn-primary"}>Update</button>
                                        <button className={"btn btn-light"}>Cancel</button>
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