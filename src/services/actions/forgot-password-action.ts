import {forgotPassword} from "../../utils/burger-api";
import {AppDispatch} from "../store";

export const SET_ERROR_INPUT = 'SET_ERROR_INPUT' as const;
export const SET_ERROR_INPUT_TEXT = 'SET_ERROR_INPUT_TEXT' as const;
export const SET_EMAIL = 'SET_EMAIL';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS' as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED' as const;
export const RESET_REQUEST_STATUS = 'RESET_REQUEST_STATUS' as const;

export function forgotPasswordRequest(email:string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        forgotPassword(email)
            .then((data) => data.success ? dispatch({
                    type: RESET_PASSWORD_SUCCESS, payload: data.message
                }) : dispatch({
                    type: RESET_PASSWORD_FAILED, payload: data.message
                })
            )
            // @ts-ignore
            .catch((e, data) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED, payload: data.message
                })
            })
    }
}