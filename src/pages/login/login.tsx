import React, {useRef} from "react";
import {Link, Redirect, useLocation} from 'react-router-dom';
import styles from './login.module.css';
import {
    Input,
    PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {getCookie, validationEmail} from "../../utils/utils";
import {login, SET_EMAIL, SET_PASSWORD} from "../../services/actions/auth-action";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";


export const Login = () => {
    const {email, password, backendMessage} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const accessToken = getCookie('accessToken');
    const inputRef = useRef(null);
    const {state} = useLocation();

    const submit = (e:any) => {
        e.preventDefault();
        if (validationEmail(email)) {
            dispatch(login(email, password));
        }
    }

    if (accessToken) {
        return (
            // @ts-ignore
            <Redirect to={state?.from || '/'}/>
        )
    }

    return (
        <section className={styles.auth}>
            <h2 className="text text_type_main-medium">Войти</h2>
            <form className={styles.form} onSubmit={submit}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <PasswordInput onChange={e => dispatch({type: SET_PASSWORD, payload: e.target.value})}
                               value={password} name={'password'}/>
                <div className={styles.message}>{backendMessage}</div>
                <div className={styles.button}>
                    <Button type="primary">Войти</Button>
                </div>
            </form>
            <div className={styles.login}>
                <p className="text text_type_main-default text_color_inactive"> Вы - новый пользователь?
                    <Link className={styles.link}
                          to={'/register'}> Зарегистрироваться </Link></p>
                <p className="text text_type_main-default text_color_inactive"> Забыли пароль?
                    <Link className={styles.link} to={'/forgot-password'}> Восстановить пароль </Link></p>
            </div>
        </section>
    );
}

export default Login;