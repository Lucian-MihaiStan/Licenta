import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { NextPage } from "next";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'
import dashboardStyle from '@/components/dashboard_page/dashboard_style/dashboard.module.css'
import Head from "next/head";
import classNames from "classnames";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { eventNames } from "process";
import { SupportForm } from "@/components/support/support-form";


const Dashboard:  NextPage = () => {
    
    const router = useRouter();
    const userId = localStorage.getItem(GlobalConstants.USER_ID);

    function routeToPage(event: any, path: string): void {
        event.preventDefault();
        router.push(path);
    }

    const [username, setUsername] = useState<string>("Loading...");

    const handleUsername = async () => {
        const url = `${GlobalConstants.DASHBOARD_LINK}?userId=${localStorage.getItem(GlobalConstants.USER_ID)}`;
        const _usernameinfo = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const username_info = await _usernameinfo.json();
        setUsername(username_info.username);
    }

    useEffect(() => {
        handleUsername();
    }, []);

    return (
        <>

        <Head>
            <title>Dashboard: ParkLive</title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <div className={classNames("container-fluid")}>
            <div className={classNames("row", )}>
                <div className={classNames("col", dashboardStyle.top_bar)}>
                    <div className={classNames(dashboardStyle.profile_button_div)}>
                        <button className={classNames("btn btn-light", dashboardStyle.profile_button)} onClick={event => routeToPage(event, GlobalConstants.PROFILE + "/" + userId)}>
                            Profile
                        </button>
                    </div>
                    <div className={dashboardStyle.welcome_div}>
                        Welcome to ParkLive, {username} ({localStorage.getItem(GlobalConstants.USER_ID)})
                    </div>
                </div>
            </div>
            <div className={classNames("row")}>
                <div className={classNames("col", dashboardStyle.center_dcontent, dashboardStyle.left_div)}>
                    <div className={classNames("bold", dashboardStyle.words_left)}>YOU WANT TO</div>
                    <div className={classNames("bold", dashboardStyle.words_left)}>FIND PARKING?</div>
                    <button className={classNames("btn btn-light", dashboardStyle.show_button)} onClick={event => routeToPage(event, GlobalConstants.PARKING_AREAS_PAGE)}>
                        SHOW ME PARKING AREAS
                    </button>
                </div>

                <div className={classNames("col", dashboardStyle.center_dcontent, dashboardStyle.right_div)}>
                    <div className={classNames("bold", dashboardStyle.words_right)}>YOU WANT TO</div>
                    <div className={classNames("bold", dashboardStyle.words_right)}>STORE DOCUMENTS?</div>
                    <button className={classNames("btn btn-light", dashboardStyle.show_button)} onClick={event => routeToPage(event, GlobalConstants.CARS + "/" + userId)}>
                        SHOW ME MY CARS
                    </button>
                </div>
            </div>

            <div className={classNames("row", dashboardStyle.form_support)}>

                <SupportForm/>    
        
            </div>
        </div>
        </>
    )
}

export default Dashboard;