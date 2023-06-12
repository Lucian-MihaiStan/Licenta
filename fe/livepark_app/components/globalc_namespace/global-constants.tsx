export namespace GlobalConstants {

    const LOCAL_HOST = "http://localhost";

    const COLON = ":";
   
    const FRONTEND_PORT = "3000";
    const BACKEND_PORT = "9090";
    const MONGO_PORT = "5002";

    export const FRONTEND_API_LINK = LOCAL_HOST + COLON + FRONTEND_PORT;
    export const BACKEND_API_LINK = LOCAL_HOST + COLON + BACKEND_PORT;

    export const API = "/api";
    export const USER_INFO = "/userInfo";
    
    export const PROFILE = "/profile";
    export const CARS = "/cars";
    export const OWNER = "/owner";
    export const DASHBOARD = "/dashboard";
    export const SUPPORT = "/support";
    export const NOTIFICATIONS = "/notifications";
    export const NOTIFICATION = "/notification";
    export const LOGOUT = "/logout";
    export const CAR = "/car";
    export const DOCUMENT = "/document";
    export const DOCUMENT_EXPIRATION_DATE = "/documentExpirationDate";

    export const USER_DTO = "userDTO";
    export const DRIVER_DTO = "driverDTO";

    export const LICENSE_ID = "licenseId";
    export const IDENTITY_CARD_ID = "identityCardId";
    export const GENDER = "gender";

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
    export const PUT_REQUEST = "PUT";

    export const APPLICATION_JSON = "application/json";
    export const STAR = "*";

    export const REGISTER_FRONTEND_APP_LINK = "/register";
    export const LOGIN_FRONTEND_APP_LINK = "/login";


    // login response fields
    export const TOKEN = "token";
    export const USER_ID = "userId";
    export const USER_ROLE = "userRole";
    export const USER_ROLE_MASTER = "MASTER";
    export const USER_ROLE_ADMIN = "ADMIN";

    export const INSERT_DOCUMENT = "/insert_document";
    export const FIND_DOCUMENT = "/find_document";
    export const POST_ID_CARD = "/postIdCard";
    export const POST_LICENSE_CARD = "/postLicenseCard";

    export const POST_INSURANCE = "/postInsurance";
    export const POST_BRIEF = "/postBrief";

    export const RCA = "rca";
    export const ITP = "itp";
    export const ROVINIETA = "rovinieta";
    export const FIRE_EXTINGUISHER = "fireExtinguisher";
    export const FIRST_AID_KIT = "firstAidKit";
    export const CASCO = "casco";

    export const EQUIPMENT = "/equipment";

    // add car
    const ADD_CAR = "/addcar";
    export const ADD_CAR_LINK = LOCAL_HOST + COLON + BACKEND_PORT + API + CAR + ADD_CAR;
    export const USER_INFO_LINK = BACKEND_API_LINK + API + OWNER + USER_INFO;
    export const CARS_LINK = BACKEND_API_LINK + API + CAR + CARS;
    export const CAR_LINK = BACKEND_API_LINK + API + CAR + CAR;
    export const DASHBOARD_LINK = BACKEND_API_LINK + API  + DASHBOARD;

    export const ADD_DOCUMENT_LINK = LOCAL_HOST + COLON + MONGO_PORT + INSERT_DOCUMENT;
    export const POST_ID_CARD_LINK = LOCAL_HOST + COLON + BACKEND_PORT + API + OWNER + POST_ID_CARD;
    export const GET_DOCUMENT_LINK = LOCAL_HOST + COLON + MONGO_PORT + FIND_DOCUMENT;

    export const POST_LICENSE_CARD_LINK = LOCAL_HOST + COLON + BACKEND_PORT + API + OWNER + POST_LICENSE_CARD;
    export const NOTIFICATIONS_LINK = LOCAL_HOST + COLON + BACKEND_PORT + API + NOTIFICATIONS + NOTIFICATION;

    
    export const EQUIPMENT_LINK = CAR_LINK + EQUIPMENT;
    export const DOCUMENT_LINK = CAR_LINK + DOCUMENT;


    export const PARKING_LINK = BACKEND_API_LINK + API + "/parkings";
    export const PARKING_SPOTS_LINK = BACKEND_API_LINK + API + "/parkingSpots";
    export const RESERVATIONS_LINK = BACKEND_API_LINK + API + "/reservations";
    export const ADD_PARKING_PAGE = "addParking";
    export const PARKING_AREAS_PAGE = "/parking/parkingAreas";
    export const CONFIGURE_PARKING_SCHEME = "/parking/configureParkingScheme";
    export const CONFIGURE_PARKING_SPOTS_DETAILS = "/parking/configureParkingSpotsDetails";
    export const VIEW_PARKING_PAGE = "/parking/viewParking";

}
