import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from "../globalc_namespace/inputc/input-constants";

export const DashboardForm = () => {

    return (

        <div>

            <p>Welcome</p>

            <p>{localStorage.getItem(GlobalConstants.USER_ID)}</p>
            <p>{localStorage.getItem(InputConstants.USERNAME)}</p>
            <p>{localStorage.getItem(InputConstants.EMAIL)}</p>

        </div>

    );

}