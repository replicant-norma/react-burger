import config from "../config/config";

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