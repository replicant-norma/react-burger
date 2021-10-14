import config from "../config/config";
import {getCookie, setCookie} from "./utils";
import {IIngredientsOrder} from "../types";

const checkResponse = (res:any) => {
    return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

export function getIngredients() {
    return fetch(config.url + '/api/ingredients')
        .then((res) => checkResponse(res))
}

export function getOrder(orderDetails: {}) {
    const accessToken = getCookie('accessToken');
    return fetch(config.url + '/api/orders?token=' + accessToken, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(orderDetails)
    })
        .then((res) => checkResponse(res))
}

export function getOrdersAll() {
    //const accessToken = getCookie('accessToken');
    return fetch(config.url + '/api/orders/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then((res) => checkResponse(res))
}

export function forgotPassword(email:string) {
    const data = {email: email}
    return fetch(config.url + '/api/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}

export function resetPassword(password:string, token:string) {
    const data = {password: password, token: token}
    return fetch(config.url + '/api/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}

export function registerUser(email:string, password:string, name:string) {
    const data = {email: email, password: password, name: name}
    return fetch(config.url + '/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}

export function loginUser(email:string, password:string) {
    const data = {email: email, password: password}
    return fetch(config.url + '/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}

export function logoutUser() {
    const refreshToken = localStorage.getItem('refreshToken');
    const data = {token: refreshToken}
    return fetch(config.url + '/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}

export function getUserInfo() {
    //refreshToken();
    return fetch(config.url + '/api/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
    })
        .then((res) => checkResponse(res))
}

export function updateUserInfo(email:string, password:string, name:string) {
    //refreshToken();
    const data = {email: email, password: password, name: name}
    return fetch(config.url + '/api/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
}


export function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const data = {token: refreshToken}
    return fetch(config.url + '/api/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            setCookie('accessToken', '', {expires: -1});
            setCookie('accessToken', data.accessToken.split('Bearer ')[1], {expires: 1200});
            localStorage.setItem('refreshToken', data.refreshToken);
        })
        .catch((e) => {
            console.log(e);
        })
}