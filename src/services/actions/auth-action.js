import {registerUser, loginUser, getUserInfo, updateUserInfo, logoutUser} from "../../utils/burger-api";
import {setCookie} from "../../utils/utils";

export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_IS_AUTH = 'SET_IS_AUTH';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';
export const TRY_ORDER_REQUEST = 'TRY_ORDER_REQUEST';
export const LOGOUT = 'LOGOUT';

export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        registerUser(email, password, name)
            .then((data) => {
                if (data.success) {
                    dispatch({type: REGISTER_SUCCESS, payload: data.message});
                    const token = data.accessToken.split('Bearer ')[1];
                    setCookie('accessToken', token, {expires: 1200});
                    localStorage.setItem('refreshToken', data.refreshToken);
                    dispatch({type: SET_ACCESS_TOKEN, payload: token});
                    dispatch({type: SET_REFRESH_TOKEN, payload: data.refreshToken});
                } else {
                    dispatch({type: REGISTER_FAILED, payload: data.message})
                }
            })
            .catch((e) => {
                dispatch({
                    type: REGISTER_FAILED, payload: e.message
                })
            })
    }
}


export function login(email, password) {
    return function (dispatch) {
        dispatch({
            type: AUTH_REQUEST
        });
        loginUser(email, password)
            .then((data) => {
                if (data.success) {
                    dispatch({type: AUTH_SUCCESS, payload: data.message});
                    const token = data.accessToken.split('Bearer ')[1];
                    setCookie('accessToken', token, {expires: 1200});
                    localStorage.setItem('refreshToken', data.refreshToken);
                    dispatch({type: SET_ACCESS_TOKEN, payload: token});
                    dispatch({type: SET_REFRESH_TOKEN, payload: data.refreshToken});
                } else {
                    dispatch({type: AUTH_FAILED, payload: data.message})
                }
            })
            .catch((e) => {
                dispatch({
                    type: AUTH_FAILED, payload: e.message
                })
            })
    }
}

export function getProfile() {
    return function (dispatch) {
        dispatch({
            type: USER_INFO_REQUEST
        });
        getUserInfo()
            .then((data) => {
                if (data.success) {
                    dispatch({type: USER_INFO_SUCCESS});
                    dispatch({type: SET_EMAIL, payload: data.user.email});
                    dispatch({type: SET_USER_NAME, payload: data.user.name});
                } else {
                    dispatch({type: USER_INFO_FAILED})
                }
            })
            .catch((e) => {
                dispatch({
                    type: USER_INFO_FAILED
                })
            })
    }
}


export function updateProfile(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: USER_INFO_REQUEST
        });
        updateUserInfo(email, password, name)
            .then((data) => {
                if (data.success) {
                    dispatch({type: USER_INFO_SUCCESS, payload: 'Сохранено'});
                    dispatch({type: SET_EMAIL, payload: data.user.email});
                    dispatch({type: SET_USER_NAME, payload: data.user.name});
                } else {
                    dispatch({type: USER_INFO_FAILED, payload: data.message})
                }
            })
            .catch((e) => {
                dispatch({
                    type: USER_INFO_FAILED, payload: e.message
                })
            })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: AUTH_REQUEST
        });
        logoutUser()
            .then((data) => {
                if (data.success) {
                    dispatch({type: AUTH_SUCCESS, payload: data.message});
                    dispatch({type: LOGOUT});
                } else {
                    dispatch({type: AUTH_FAILED, payload: data.message})
                }
            })
            .catch((e) => {
                dispatch({
                    type: AUTH_FAILED, payload: e.message
                })
            })
    }
}