import { GlobalConstants } from '../globalc_namespace/global-constants';
import { useRouter } from 'next/router';

export const NavigationBar = () => {

    const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    return (
        <div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.DASHBOARD_PAGE)}> Dashboard </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.PROFILE_PAGE)}> Profile </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.CARS_PAGE)}> Cars </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.DOCUMENTS)}> Documents </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.SUPPORT_PAGE)}> Support </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.NOTIFICATION_PAGE)}> Notifications </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.LOGOUT)}> Logout </button> </div>
        </div>
    );
}
