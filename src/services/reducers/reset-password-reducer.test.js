import {
    NEW_PASSWORD_FAILED,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    SET_PASSWORD,
    SET_TOKEN
} from "../actions/reset-password-action";

import {resetPasswordReducer} from "./reset-password-reducer";

const initialState = {
    password: '',
    token: '',
    newPasswordRequest: false,
    newPasswordSuccess: false,
    newPasswordFailed: false,
    backendMessage: ''
}

describe('resetPasswordReducer', () => {
    it('Test the initial state', () => {
        expect(resetPasswordReducer(initialState, {})).toEqual(
            {
                password: '',
                token: '',
                newPasswordRequest: false,
                newPasswordSuccess: false,
                newPasswordFailed: false,
                backendMessage: ''
            }
        )
    })
    it('Test NEW_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(initialState, {type: NEW_PASSWORD_FAILED, payload: "Failed"})).toEqual(
            {
                ...initialState, newPasswordFailed: true,
                newPasswordSuccess: false, newPasswordRequest: false, backendMessage: "Failed"
            }
        )
    })
    it('Test NEW_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {type: NEW_PASSWORD_REQUEST})).toEqual(
            {
                ...initialState, newPasswordRequest: true,
                newPasswordSuccess: false, newPasswordFailed: false, backendMessage: ''
            }
        )
    })
    it('Test NEW_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(initialState, {type: NEW_PASSWORD_SUCCESS, payload: "Success"})).toEqual(
            {
                ...initialState, newPasswordSuccess: true,
                newPasswordRequest: false, newPasswordFailed: false, backendMessage: "Success"
            }
        )
    })
    it('Test SET_PASSWORD', () => {
        expect(resetPasswordReducer(initialState, {type: SET_PASSWORD, payload: "P@rol"})).toEqual(
            {...initialState, password: "P@rol"}
        )
    })
    it('Test SET_TOKEN', () => {
        expect(resetPasswordReducer(initialState,
            {type: SET_TOKEN, payload: "HDYweoweiuds73ns"})).toEqual(
            {...initialState, token: "HDYweoweiuds73ns"}
        )
    })
})