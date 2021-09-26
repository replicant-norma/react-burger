import {
    SET_ERROR_INPUT,
    SET_ERROR_INPUT_TEXT,
    SET_EMAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_REQUEST_STATUS
} from '../actions/forgot-password-action'

const initialState = {
    email: '',
    errorInput: false,
    errorInputText: '',
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
    backendMessage: '',
}

export const forgotPasswordReducer  = (state = initialState, action) => {
    switch(action.type){
        case SET_ERROR_INPUT:{
            return {...state, errorInput: action.payload}
        }
        case SET_ERROR_INPUT_TEXT: {
            return {...state, errorInputText: action.payload}
        }
        case SET_EMAIL: {
            return {...state, email: action.payload}
        }
        case RESET_PASSWORD_REQUEST:{
            return {...state, resetPasswordRequest: true,
                resetPasswordSuccess: false, resetPasswordFailed: false, backendMessage: ''}
        }
        case RESET_PASSWORD_SUCCESS:{
            return {...state, resetPasswordSuccess: true,
                resetPasswordFailed: false, resetPasswordRequest: false, backendMessage: action.payload}
        }
        case RESET_PASSWORD_FAILED:{
            return {...state, resetPasswordFailed: true,
                resetPasswordSuccess: false, resetPasswordRequest: false, backendMessage: action.payload}
        }
        case RESET_REQUEST_STATUS:{
            return {...state, resetPasswordSuccess: false,
                resetPasswordRequest: false, resetPasswordFailed: false}
        }
        default:{
            return state
        }
    }
}