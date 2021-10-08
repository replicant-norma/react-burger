import {
    SET_ERROR_INPUT,
    SET_ERROR_INPUT_TEXT,
    SET_EMAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_REQUEST_STATUS
} from '../actions/forgot-password-action'
import {forgotPasswordReducer as reducer} from "./forgot-password-reducer";

const initialState = {
    email: '',
    errorInput: false,
    errorInputText: '',
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
    backendMessage: '',
}

describe('forgotPasswordReducer', () => {
    it('Test the initial state', () => {
        expect(reducer(initialState, {})).toEqual(
            {
                email: '',
                errorInput: false,
                errorInputText: '',
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordFailed: false,
                backendMessage: '',
            }
        )
    })
    it('Test SET_ERROR_INPUT', () => {
        expect(reducer(initialState, {type: SET_ERROR_INPUT, payload: true})).toEqual(
            {...initialState, errorInput: true}
        )
    })

    it('Test SET_ERROR_INPUT_TEXT', () => {
        expect(reducer(initialState, {type: SET_ERROR_INPUT_TEXT, payload: "Error message"}))
            .toEqual({...initialState, errorInputText: "Error message"}
            )
    })

    it('Test SET_EMAIL', () => {
        expect(reducer(initialState, {type: SET_EMAIL, payload: "test@example.com"})).toEqual(
            {...initialState, email: "test@example.com"}
        )
    })

    it('Test RESET_PASSWORD_REQUEST', () => {
        expect(reducer(initialState, {type: RESET_PASSWORD_REQUEST, payload: ''})).toEqual(
            {
                ...initialState, resetPasswordRequest: true,
                resetPasswordSuccess: false, resetPasswordFailed: false, backendMessage: ''
            }
        )
    })

    it('Test RESET_PASSWORD_SUCCESS', () => {
        expect(reducer(initialState, {type: RESET_PASSWORD_SUCCESS, payload: "Success"})).toEqual(
            {
                ...initialState, resetPasswordSuccess: true,
                resetPasswordFailed: false, resetPasswordRequest: false, backendMessage: "Success"
            }
        )
    })

    it('Test RESET_PASSWORD_FAILED', () => {
        expect(reducer(initialState, {type: RESET_PASSWORD_FAILED, payload: "Failed"})).toEqual(
            {
                ...initialState, resetPasswordFailed: true,
                resetPasswordSuccess: false, resetPasswordRequest: false, backendMessage: "Failed"
            }
        )
    })

    it('Test RESET_REQUEST_STATUS', () => {
        expect(reducer(initialState, {type: RESET_REQUEST_STATUS})).toEqual(
            {
                ...initialState, resetPasswordSuccess: false,
                resetPasswordRequest: false, resetPasswordFailed: false
            }
        )
    })
})