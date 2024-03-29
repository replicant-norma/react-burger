import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_NAME,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    TRY_ORDER_REQUEST,
    LOGOUT
} from "../actions/auth-action";
import {TAuthActions} from "../types/auth-action";

type TAuthState = {
    email: string;
    password: string;
    userName: string;
    accessToken: string | undefined;
    refreshToken: string | null;
    registerRequest: boolean;
    registerSuccess: boolean;
    registerFailed: boolean;
    authRequest: boolean;
    authSuccess: boolean;
    authFailed: boolean;
    userInfoRequest: boolean;
    userInfoSuccess: boolean;
    userInfoFailed: boolean;
    tryOrderRequest: boolean;
    backendMessage: string;
}


const initialState: TAuthState = {
    email: '',
    password: '',
    userName: '',
    accessToken: '',
    refreshToken: '',
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
    authRequest: false,
    authSuccess: false,
    authFailed: false,
    userInfoRequest: false,
    userInfoSuccess: false,
    userInfoFailed: false,
    tryOrderRequest: false,
    backendMessage: '',
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {
        case SET_EMAIL: {
            return {...state, email: action.payload}
        }
        case SET_PASSWORD: {
            return {...state, password: action.payload}
        }
        case SET_USER_NAME: {
            return {...state, userName: action.payload}
        }
        case SET_ACCESS_TOKEN: {
            return {...state, password: '', accessToken: action.payload}
        }
        case SET_REFRESH_TOKEN: {
            return {...state, password: '', refreshToken: action.payload}
        }

        case REGISTER_REQUEST: {
            return {
                ...state, registerRequest: true, registerSuccess: false,
                registerFailed: false, backendMessage: ''
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state, registerRequest: false, registerSuccess: true,
                registerFailed: false, backendMessage: action.payload
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state, registerRequest: false, registerSuccess: false,
                registerFailed: true, backendMessage: action.payload
            }
        }
        case AUTH_REQUEST: {
            return {
                ...state, authRequest: true, authSuccess: false,
                authFailed: false, backendMessage: ''
            }
        }
        case AUTH_SUCCESS: {
            return {
                ...state, authRequest: false, authSuccess: true,
                authFailed: false, backendMessage: action.payload
            }
        }
        case AUTH_FAILED: {
            return {
                ...state, authRequest: false, authSuccess: false,
                authFailed: true, backendMessage: action.payload
            }
        }
        case USER_INFO_REQUEST: {
            return {
                ...state, userInfoRequest: true, userInfoSuccess: false,
                userInfoFailed: false, backendMessage: ''
            }
        }
        case USER_INFO_SUCCESS: {
            return {
                ...state, userInfoRequest: false, userInfoSuccess: true,
                userInfoFailed: false, backendMessage: action.payload
            }
        }
        case USER_INFO_FAILED: {
            return {
                ...state, userInfoRequest: false, userInfoSuccess: false,
                userInfoFailed: true, backendMessage: action.payload
            }
        }
        case TRY_ORDER_REQUEST: {
            return {...state, tryOrderRequest: action.payload}
        }
        case LOGOUT: {
            return {
                ...state, email: '', password: '', userName: '', accessToken: undefined,
                refreshToken: null, tryOrderRequest: false
            }
        }
        default: {
            return state
        }
    }
}