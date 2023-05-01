import React, {  } from "react";
import { ProfileForm } from "../../components/profile_page/profile-form";
import { NextPage } from "next";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;

    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <div>
            <h1> {userId} </h1>
            <NavigationBar/>
            <ProfileForm/>
        </div>
    )
}

export default Profile;