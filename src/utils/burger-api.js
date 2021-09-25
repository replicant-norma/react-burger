import config from "../config/config";
import {getCookie, setCookie} from "./utils";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
    return fetch(config.url + '/api/ingredients')
        .then((res) => checkResponse(res))
}

export function getOrder(orderDetails) {
    return fetch(config.url + '/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(orderDetails)
    })
        .then((res) => checkResponse(res))
}

export function forgotPassword(email) {
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

export function resetPassword(password, token) {
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

export function registerUser(email, password, name) {
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

export function loginUser(email, password) {
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

export function getUserInfo(){
    refreshToken();
    return fetch(config.url + '/api/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
    })
        .then((res) => checkResponse(res))
}

export function updateUserInfo(email, password, name){
    refreshToken();
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


export function refreshToken(){
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
        .then((data) =>{
            setCookie('accessToken', data.accessToken.split('Bearer ')[1],{expires: 1200});
            localStorage.setItem('refreshToken', data.refreshToken);
        })
        .catch((e) =>{
            console.log(e);
        })

}