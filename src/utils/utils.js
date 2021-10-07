import {differenceInDays, formatDistance} from 'date-fns';
import {ru} from 'date-fns/locale';


export const validationEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(String(email).toLowerCase());
}

export const validationPassword = (password) => {
    return String(password).length > 8
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function dateFormat(date) {
    const dt = new Date(date);
    const diff = differenceInDays(new Date(), dt);
    const minutes = dt.getMinutes() < 10 ? '0' + dt.getMinutes().toString() : dt.getMinutes();

    if (diff > 0) {
        return formatDistance(
            dt,
            new Date(new Date()),
            {locale: ru} // Pass the locale as an option
        ) + ' назад, ' + dt.getHours() + ":" + dt.getMinutes();
    } else {
        return 'Сегодня, ' + dt.getHours() + ":" + minutes;
    }
}
