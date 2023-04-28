import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from "../globalc_namespace/inputc/input-constants";
import { NavigationBar } from "../navigation_bar/navigation-bar";

export const DashboardForm = () => {

    return (
        <div>
            <p>Welcome, {localStorage.getItem(InputConstants.USERNAME)}</p>
        </div>

    );

}