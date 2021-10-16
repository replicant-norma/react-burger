import {
    SET_PASSWORD,
    SET_TOKEN,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILED
} from '../actions/reset-password-action';

export interface ISetPassword {
    readonly type: typeof SET_PASSWORD;
    readonly payload: string;
}

export interface ISetToken {
    readonly type: typeof SET_TOKEN;
    readonly payload: string;
}

export interface INewPasswordRequest {
    readonly type: typeof NEW_PASSWORD_REQUEST;
}

export interface INewPasswordSuccess {
    readonly type: typeof NEW_PASSWORD_SUCCESS;
    readonly payload: string;
}

export interface INewPasswordFailed {
    readonly type: typeof NEW_PASSWORD_FAILED;
    readonly payload: string;
}

export type TResetPasswordActions =
    | ISetPassword
    | ISetToken
    | INewPasswordRequest
    | INewPasswordSuccess
    | INewPasswordFailed