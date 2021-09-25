import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_NAME,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    SET_IS_AUTH,
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

const initialState = {
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
}

export const authReducer = (state = initialState, action) => {
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
        case SET_IS_AUTH: {
            return {...state, password: '', isAuth: action.payload}
        }
        case REGISTER_REQUEST: {
            return {...state, registerRequest: true, registerSuccess: false, registerFailed: false}
        }
        case REGISTER_SUCCESS: {
            return {...state, registerRequest: false, registerSuccess: true, registerFailed: false}
        }
        case REGISTER_FAILED: {
            return {...state, registerRequest: false, registerSuccess: false, registerFailed: true}
        }
        case AUTH_REQUEST: {
            return {...state, authRequest: true, authSuccess: false, authFailed: false}
        }
        case AUTH_SUCCESS: {
            return {...state, authRequest: false, authSuccess: true, authFailed: false}
        }
        case AUTH_FAILED: {
            return {...state, authRequest: false, authSuccess: false, authFailed: true}
        }
        case USER_INFO_REQUEST: {
            return {...state, userInfoRequest: true, userInfoSuccess: false, userInfoFailed: false}
        }
        case USER_INFO_SUCCESS: {
            return {...state, userInfoRequest: false, userInfoSuccess: true, userInfoFailed: false}
        }
        case USER_INFO_FAILED: {
            return {...state, userInfoRequest: false, userInfoSuccess: false, userInfoFailed: true}
        }
        case TRY_ORDER_REQUEST:{
            return {...state, tryOrderRequest: action.payload}
        }
        case LOGOUT:{
            return {...state, email:'', password: '', userName: '', accessToken: '',
                refreshToken: '', tryOrderRequest: false}
        }
        default:{
            return state
        }
    }
}