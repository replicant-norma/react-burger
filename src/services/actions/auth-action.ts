import {registerUser, loginUser, getUserInfo, updateUserInfo, logoutUser} from "../../utils/burger-api";
import {setCookie} from "../../utils/utils";
import {AppDispatch, AppThunk} from "../store";

export const SET_EMAIL = 'SET_EMAIL' as const;
export const SET_PASSWORD = 'SET_PASSWORD' as const;
export const SET_USER_NAME = 'SET_USER_NAME' as const;
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN' as const;
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN' as const;
export const SET_IS_AUTH = 'SET_IS_AUTH' as const;
export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const;
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
export const REGISTER_FAILED = 'REGISTER_FAILED' as const;
export const AUTH_REQUEST = 'AUTH_REQUEST' as const;
export const AUTH_SUCCESS = 'AUTH_SUCCESS' as const;
export const AUTH_FAILED = 'AUTH_FAILED' as const;
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST' as const;
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS' as const;
export const USER_INFO_FAILED = 'USER_INFO_FAILED' as const;
export const TRY_ORDER_REQUEST = 'TRY_ORDER_REQUEST' as const;
export const LOGOUT = 'LOGOUT' as const;

export const register: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
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


export const login: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
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

export const getProfile: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: USER_INFO_REQUEST
        });
        getUserInfo()
            .then((data) => {
                if (data.success) {
                    dispatch({type: USER_INFO_SUCCESS, payload: data.message});
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


export const updateProfile: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
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

export const logout: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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