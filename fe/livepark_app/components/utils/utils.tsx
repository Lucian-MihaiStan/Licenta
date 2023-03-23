import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";

export namespace Utils {

    export const getUsers = async (event: any) => {
        event.preventDefault();
        const response = await fetch(GlobalConstants.ALL_USERS_LINK, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
            }
        })

        console.log(response);
        console.log(response.status);
        const _users = await(response.json());
        console.log(_users);
    }

}