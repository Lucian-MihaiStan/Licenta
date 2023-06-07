import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { Models } from "@/components/cars/car";

const Notifications: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;

    const [notifications, setNotifications] = useState<Models.NotificationModel[]>([]);

    const notificationInfo = async () => {
        const url = `${GlobalConstants.NOTIFICATIONS_LINK}?userId=${userId}`;
        const request = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + sessionStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        if (!request.ok) {
            console.log("Not found");
            return;
        }

        const _notifications = await request.json();
        setNotifications(_notifications);
    }

    useEffect(() => {
        notificationInfo();
    }, [userId]);

    if (userId == null)
        return <div> Loading... </div>
    return (
        <div>
            <h1> {userId} </h1>
            
            <NavigationBar/>


            {
                Array.isArray(notifications)
                ? notifications.map((notification) => {
                    return (
                        <div>
                            <h1> {notification.title} </h1>
                            <h1> {notification.message} </h1>
                            <h1> {notification.createdAt.toLocaleString()} </h1>
                        </div>
                    )
                }) : "Loading..."
            }

        </div>
    )
}

export default Notifications;