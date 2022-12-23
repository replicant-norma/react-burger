import {
    NEW_PASSWORD_FAILED,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    SET_PASSWORD,
    SET_TOKEN
} from "../actions/reset-password-action";
import {TResetPasswordActions} from "../types/reset-password-action";

type TResetPasswordState = {
    password: string;
    token: string;
    newPasswordRequest: boolean;
    newPasswordSuccess: boolean;
    newPasswordFailed: boolean;
    backendMessage: string | null;
}

const initialState: TResetPasswordState = {
    password: '',
    token: '',
    newPasswordRequest: false,
    newPasswordSuccess: false,
    newPasswordFailed: false,
    backendMessage: ''
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions):TResetPasswordState => {
    switch (action.type) {
        case SET_PASSWORD: {
            return {...state, password: action.payload}
        }
        case SET_TOKEN: {
            return {...state, token: action.payload}
        }
        case NEW_PASSWORD_REQUEST: {
            return {
                ...state, newPasswordRequest: true,
                newPasswordSuccess: false, newPasswordFailed: false, backendMessage: ''
            }
        }
        case NEW_PASSWORD_SUCCESS: {
            return {
                ...state, newPasswordSuccess: true,
                newPasswordRequest: false, newPasswordFailed: false, backendMessage: action.payload
            }
        }
        case NEW_PASSWORD_FAILED: {
            return {
                ...state, newPasswordFailed: true,
                newPasswordSuccess: false, newPasswordRequest: false, backendMessage: action.payload
            }
        }
        default: {
            return state
        }
    }
}