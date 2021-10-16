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
} from '../actions/auth-action';

export interface ISetEmail {
    readonly type: typeof SET_EMAIL;
    readonly payload: string;
}

export interface ISetPassword {
    readonly type: typeof SET_PASSWORD;
    readonly payload: string;
}

export interface ISetName {
    readonly type: typeof SET_USER_NAME;
    readonly payload: string;
}

export interface ISetAccessToken {
    readonly type: typeof SET_ACCESS_TOKEN;
    readonly payload: string | undefined;
}

export interface ISetRefreshToken {
    readonly type: typeof SET_REFRESH_TOKEN;
    readonly payload: string | null;
}

export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: string;
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
    readonly payload: string;
}

export interface IAuthRequest {
    readonly type: typeof AUTH_REQUEST;
}

export interface IAuthSuccess {
    readonly type: typeof AUTH_SUCCESS;
    readonly payload: string;
}

export interface IAuthFailed {
    readonly type: typeof AUTH_FAILED;
    readonly payload: string;
}

export interface IUserInfoRequest {
    readonly type: typeof USER_INFO_REQUEST;
}

export interface IUserInfoSuccess {
    readonly type: typeof USER_INFO_SUCCESS;
    readonly payload: string;
}

export interface IUserInfoFailed {
    readonly type: typeof USER_INFO_FAILED;
    readonly payload: string;
}

export interface ITryOrderRequest {
    readonly type: typeof TRY_ORDER_REQUEST;
    readonly payload: boolean;
}

export interface ILogout {
    readonly type: typeof LOGOUT;
}

export type TAuthActions =
    | ISetEmail
    | ISetPassword
    | ISetName
    | ISetAccessToken
    | ISetRefreshToken
    | IRegisterRequest
    | IRegisterSuccess
    | IRegisterFailed
    | IAuthRequest
    | IAuthSuccess
    | IAuthFailed
    | IUserInfoRequest
    | IUserInfoSuccess
    | IUserInfoFailed
    | ITryOrderRequest
    | ILogout