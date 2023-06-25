import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { Models } from "@/components/cars/car";
import { NModels } from "@/components/notifications/notification_model";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'
import Head from "next/head";
import classNames from "classnames";
import notifications_style from "@/components/notifications/notifications_styles/notification_style.module.css"
import { NotificationCard } from "@/components/notifications/notification_component";

const Notifications: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;

    const [notifications, setNotifications] = useState<NModels.NotificationModel[]>([]);

    const notificationInfo = async () => {
        const url = `${GlobalConstants.NOTIFICATIONS_LINK}?userId=${userId}`;
        const request = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
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
        <>
        <Head>
        <title> Notifications: ParkLive </title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>
        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
                <div className={classNames(notifications_style.notifications_div_position)}>
                    <div className={classNames(notifications_style.title)}>NOTIFICATIONS</div>
                    
                    <div className={classNames("container-fluid")}>
                        {
                            Array.isArray(notifications)
                            ? notifications.map((notification) => {
                                return (
                                    <NotificationCard notification={notification} userId={userId}/>
                                )
                            }) : "Loading..."
                        }
                    </div>
                </div>


            </section>

        </div>
        </>
    )
}

export default Notifications;