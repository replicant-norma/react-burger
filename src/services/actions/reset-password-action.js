import {resetPassword} from "../../utils/burger-api";

export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_TOKEN = 'SET_TOKEN';
export const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_FAILED = 'NEW_PASSWORD_FAILED';

export function resetPasswordRequest(password, token) {
    return function (dispatch) {
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