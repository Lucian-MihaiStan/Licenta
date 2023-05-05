import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";

const Notifications: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;
    
    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <div>
            <h1> {userId} </h1>
            
            <NavigationBar/>
        </div>
    )
}

export default Notifications;