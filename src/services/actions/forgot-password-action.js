import {forgotPassword, getIngredients} from "../../utils/burger-api";

export const SET_ERROR_INPUT = 'SET_ERROR_INPUT';
export const SET_ERROR_INPUT_TEXT = 'SET_ERROR_INPUT_TEXT';
export const SET_EMAIL = 'SET_EMAIL';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_REQUEST_STATUS = 'RESET_REQUEST_STATUS';

export function forgotPasswordRequest(email) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        forgotPassword(email)
            .then((data) => data.success ? dispatch({
                    type: 'RESET_PASSWORD_SUCCESS'
                }) : dispatch({
                    type: 'RESET_PASSWORD_FAILED'
                })
            )
            .catch((e) => {
                dispatch({
                    type: 'RESET_PASSWORD_FAILED'
                })
            })
    }
}