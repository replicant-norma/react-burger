import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_NAME,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILED,
    TRY_ORDER_REQUEST,
    LOGOUT
} from "../actions/auth-action";

const initialState = {
    email: '',
    password: '',
    userName: '',
    accessToken: '',
    refreshToken: '',
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
    authRequest: false,
    authSuccess: false,
    authFailed: false,
    userInfoRequest: false,
    userInfoSuccess: false,
    userInfoFailed: false,
    tryOrderRequest: false,
    backendMessage: '',
}

import {authReducer} from "./auth-reducer";

describe('authReducer', () => {
    it('Test the initial state', () => {
        expect(authReducer(initialState, {})).toEqual(
            {
                email: '',
                password: '',
                userName: '',
                accessToken: '',
                refreshToken: '',
                registerRequest: false,
                registerSuccess: false,
                registerFailed: false,
                authRequest: false,
                authSuccess: false,
                authFailed: false,
                userInfoRequest: false,
                userInfoSuccess: false,
                userInfoFailed: false,
                tryOrderRequest: false,
                backendMessage: '',
            }
        )
    })
    it('Test SET_EMAIL', () => {
        expect(authReducer(initialState, {type: SET_EMAIL, payload: "test@example.com"}))
            .toEqual({...initialState, email: "test@example.com"})
    })

    it('Test SET_PASSWORD', () => {
        expect(authReducer(initialState, {type: SET_PASSWORD, payload: "P@rol"}))
            .toEqual({...initialState, password: "P@rol"})
    })

    it('Test SET_USER_NAME', () => {
        expect(authReducer(initialState, {type: SET_USER_NAME, payload: "Vasya"}))
            .toEqual({...initialState, userName: "Vasya"})
    })

    it('Test SET_ACCESS_TOKEN', () => {
        expect(authReducer(initialState, {type: SET_ACCESS_TOKEN, payload: "qpowiepqiwepod902ujerhweru392u3"}))
            .toEqual({...initialState, password: '', accessToken: "qpowiepqiwepod902ujerhweru392u3"})
    })

    it('Test SET_REFRESH_TOKEN', () => {
        expect(authReducer(initialState, {type: SET_REFRESH_TOKEN, payload: "iwqoiesax213280983kjds"}))
            .toEqual({...initialState, password: '', refreshToken: "iwqoiesax213280983kjds"})
    })

    it('Test REGISTER_REQUEST', () => {
        expect(authReducer(initialState, {type: REGISTER_REQUEST}))
            .toEqual({
                ...initialState, registerRequest: true, registerSuccess: false,
                registerFailed: false, backendMessage: ''
            })
    })

    it('Test REGISTER_SUCCESS', () => {
        expect(authReducer(initialState, {type: REGISTER_SUCCESS, payload: "Success"}))
            .toEqual({
                ...initialState, registerRequest: false, registerSuccess: true,
                registerFailed: false, backendMessage: "Success"
            })
    })

    it('Test REGISTER_FAILED', () => {
        expect(authReducer(initialState, {type: REGISTER_FAILED, payload: "Failed"}))
            .toEqual({
                ...initialState, registerRequest: false, registerSuccess: false,
                registerFailed: true, backendMessage: "Failed"
            })
    })

    it('Test AUTH_REQUEST', () => {
        expect(authReducer(initialState, {type: AUTH_REQUEST}))
            .toEqual({
                ...initialState, authRequest: true, authSuccess: false,
                authFailed: false, backendMessage: ''
            })
    })

    it('Test AUTH_SUCCESS', () => {
        expect(authReducer(initialState, {type: AUTH_SUCCESS, payload: "Success"}))
            .toEqual({
                ...initialState, authRequest: false, authSuccess: true,
                authFailed: false, backendMessage: "Success"
            })
    })

    it('Test AUTH_FAILED', () => {
        expect(authReducer(initialState, {type: AUTH_FAILED, payload: "Failed"}))
            .toEqual({
                ...initialState, authRequest: false, authSuccess: false,
                authFailed: true, backendMessage: "Failed"
            })
    })

    it('Test USER_INFO_REQUEST', () => {
        expect(authReducer(initialState, {type: USER_INFO_REQUEST}))
            .toEqual({
                ...initialState, userInfoRequest: true, userInfoSuccess: false,
                userInfoFailed: false, backendMessage: ''
            })
    })

    it('Test USER_INFO_SUCCESS', () => {
        expect(authReducer(initialState, {type: USER_INFO_SUCCESS, payload: "Success"}))
            .toEqual({
                ...initialState, userInfoRequest: false, userInfoSuccess: true,
                userInfoFailed: false, backendMessage: "Success"
            })
    })

    it('Test USER_INFO_FAILED', () => {
        expect(authReducer(initialState, {type: USER_INFO_FAILED, payload: "Failed"}))
            .toEqual({
                ...initialState, userInfoRequest: false, userInfoSuccess: false,
                userInfoFailed: true, backendMessage: "Failed"
            })
    })

    it('Test TRY_ORDER_REQUEST', () => {
        expect(authReducer(initialState, {type: TRY_ORDER_REQUEST, payload: true}))
            .toEqual({
                ...initialState, tryOrderRequest: true
            })
    })

    it('Test LOGOUT', () => {
        expect(authReducer(initialState, {type: LOGOUT}))
            .toEqual({
                ...initialState, email: '', password: '', userName: null, accessToken: null,
                refreshToken: null, tryOrderRequest: false
            })
    })

})
