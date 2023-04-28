export namespace GlobalConstants {

    const LOCAL_HOST = "http://localhost";

    const COLON = ":";
   
    const FRONTEND_PORT = "3000";
    const BACKEND_PORT = "9090";

    export const FRONTEND_API_LINK = LOCAL_HOST + COLON + FRONTEND_PORT;
    export const BACKEND_API_LINK = LOCAL_HOST + COLON + BACKEND_PORT;

    export const PROFILE_PAGE = "/profile";
    export const DASHBOARD_PAGE = "/dashboard";
    export const CARS_PAGE = "/cars";
    export const DOCUMENTS = "/documents";
    export const SUPPORT_PAGE = "/support";
    export const NOTIFICATION_PAGE = "/notifications";
    export const LOGOUT = "/logout";

    const API_AUTH_ALLUSERS = "/api/auth/allusers";
    
    // register
    const API_AUTH_SIGNUP = "/api/auth/signup";
    export const USER_SIGN_UP_LINK = BACKEND_API_LINK + API_AUTH_SIGNUP; 

    // login
    const API_AUTH_SIGNIN = "/api/auth/signin";
    export const USER_SIGN_IN_LINK = BACKEND_API_LINK + API_AUTH_SIGNIN; 

    export const ALL_USERS_LINK = BACKEND_API_LINK + API_AUTH_ALLUSERS;

    // HTTP REQUESTS
    export const GET_REQUEST = "GET";
    export const POST_REQUEST = "POST";
    export const DELETE_REQUEST = "DELETE";
    export const PUT_REQUESRT = "PUT";

    export const APPLICATION_JSON = "application/json";
    export const STAR = "*";

    export const REGISTER_FRONTEND_APP_LINK = "/register";
    export const LOGIN_FRONTEND_APP_LINK = "/login";


    // login response fields
    export const TOKEN = "token";
    export const USER_ID = "userId";


}