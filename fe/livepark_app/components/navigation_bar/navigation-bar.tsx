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
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.DASHBOARD)}> Dashboard </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.PROFILE + "/" + localStorage.getItem(GlobalConstants.USER_ID))}> Profile </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.CARS + "/" + localStorage.getItem(GlobalConstants.USER_ID))}> Cars </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.DOCUMENTS)}> Documents </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.SUPPORT)}> Support </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.NOTIFICATION)}> Notifications </button> </div>
            <div> <button onClick={(e) => routeToPage(e, GlobalConstants.LOGOUT)}> Logout </button> </div>
        </div>
    );
}
