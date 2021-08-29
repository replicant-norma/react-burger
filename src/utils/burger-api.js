import config from "../config/config";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
    return fetch(config.url + '/api/ingredients')
        .then((res) => checkResponse(res))
}