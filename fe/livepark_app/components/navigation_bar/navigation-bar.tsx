import { GlobalConstants } from '../globalc_namespace/global-constants';
import { useRouter } from 'next/router';
import {useEffect, useState} from "react";

export const NavigationBar = () => {

    const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    const [userId, setUserId] = useState<any>(null);
    useEffect(() => {
        setUserId(localStorage.getItem(GlobalConstants.USER_ID));
    }, [])

    return (
        userId == null ? <div> Loading... </div> :
        <div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.DASHBOARD)}> Dashboard </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.PROFILE + "/" + userId)}> Profile </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.PARKING_AREAS_PAGE)}> Parking areas </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.CARS + "/" + userId)}> Cars </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.SUPPORT)}> Support </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.NOTIFICATIONS + "/" + userId)}> Notifications </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.LOGOUT)}> Logout </button> </div>
        </div>
    );
}
