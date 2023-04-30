import React from "react";
import { ProfileForm } from "../../components/profile_page/profile-form";
import { NextPage } from "next";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";
import { GlobalConstants } from "../../components/globalc_namespace/global-constants";

const Profile: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;
    
    if (userId == null) {
        return <div> Loading... </div>
    }

    const [userInfo, setUserInfo] = React.useState({
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    });

    const handleProfile = async () => {

        const _userinfo = await fetch(GlobalConstants.USER_INFO_LINK, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            },
            body: JSON.stringify(userId),
        });

        const _user = await _userinfo.json();
        if (_user == null) {
            return <div>Loading ...</div>
        }
        
        setUserInfo({ ...userInfo, [GlobalConstants.FIRST_NAME]: _user[GlobalConstants.FIRST_NAME] });
        setUserInfo({ ...userInfo, [GlobalConstants.LAST_NAME]: _user[GlobalConstants.LAST_NAME] });
        setUserInfo({ ...userInfo, [GlobalConstants.USERNAME]: _user[GlobalConstants.USERNAME] });
        setUserInfo({ ...userInfo, [GlobalConstants.EMAIL]: _user[GlobalConstants.EMAIL] });
    }

    handleProfile();

    return (
        <div>

            <h1> {userId} </h1>

            <NavigationBar/>
            <ProfileForm/>
        </div>
    )
}

export default Profile;