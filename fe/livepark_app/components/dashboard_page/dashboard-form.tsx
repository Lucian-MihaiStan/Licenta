import { useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";

export const DashboardForm = () => {

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
        <div>
            <p>Welcome, {username}</p>
        </div>

    );

}