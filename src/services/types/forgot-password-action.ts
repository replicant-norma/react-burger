import {
    SET_ERROR_INPUT,
    SET_ERROR_INPUT_TEXT,
    SET_EMAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_REQUEST_STATUS
} from '../actions/forgot-password-action';

export interface ISetErrorInput {
    readonly type: typeof SET_ERROR_INPUT;
    readonly payload: boolean;
}

export interface ISetErrorInputText {
    readonly type: typeof SET_ERROR_INPUT_TEXT;
    readonly payload: string;
}

export interface ISetEmail {
    readonly type: typeof SET_EMAIL;
    readonly payload: string;
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly payload: string;
}

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
    readonly payload: string;
}

export interface IResetPasswordStatus {
    readonly type: typeof RESET_REQUEST_STATUS;
}

export type TForgotPasswordActions =
    | ISetErrorInput
    | ISetErrorInputText
    | ISetEmail
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed
    | IResetPasswordStatus