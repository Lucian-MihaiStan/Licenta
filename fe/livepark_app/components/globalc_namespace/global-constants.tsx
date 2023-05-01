export namespace GlobalConstants {

    const LOCAL_HOST = "http://localhost";

    const COLON = ":";
   
    const FRONTEND_PORT = "3000";
    const BACKEND_PORT = "9090";

    export const FRONTEND_API_LINK = LOCAL_HOST + COLON + FRONTEND_PORT;
    export const BACKEND_API_LINK = LOCAL_HOST + COLON + BACKEND_PORT;

    export const API = "/api";
    export const USER_INFO = "/userInfo";
    
    export const PROFILE = "/profile";
    export const DASHBOARD = "/dashboard";
    export const CARS = "/cars";
    export const DOCUMENTS = "/documents";
    export const SUPPORT = "/support";
    export const NOTIFICATION = "/notifications";
    export const LOGOUT = "/logout";
    export const CAR = "/car";

    export const ADD_CAR_PAGE = "/addcar";

    export const FIRST_NAME = "firstName";
    export const LAST_NAME = "lastName";
    export const USERNAME = "username";
    export const EMAIL = "email";

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

    // add car
    const ADD_CAR = "/addcar";
    export const ADD_CAR_LINK = LOCAL_HOST + COLON + BACKEND_PORT + API + DASHBOARD + ADD_CAR;
    export const USER_INFO_LINK = BACKEND_API_LINK + API + DASHBOARD + USER_INFO;
    export const CARS_LINK = BACKEND_API_LINK + API + DASHBOARD + CARS;
    export const CAR_LINK = BACKEND_API_LINK + API + DASHBOARD + CAR;
}