import {resetPassword} from "../../utils/burger-api";
import {AppDispatch, AppThunk} from "../store";

export const SET_PASSWORD = 'SET_PASSWORD' as const;
export const SET_TOKEN = 'SET_TOKEN';
export const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST' as const;
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS' as const;
export const NEW_PASSWORD_FAILED = 'NEW_PASSWORD_FAILED' as const;

export const resetPasswordRequest: AppThunk = (password: string, token: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: NEW_PASSWORD_REQUEST
        });
        resetPassword(password, token)
            .then((data) => data.success ? dispatch({
                    type: NEW_PASSWORD_SUCCESS, payload: data.message
                }) : dispatch({
                    type: NEW_PASSWORD_FAILED, payload: data.message
                })
            )
            .catch((e) => {
                dispatch({
                    type: NEW_PASSWORD_FAILED, payload: e.message
                })
            })
    }
}