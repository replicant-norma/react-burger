import React, {useState, useRef} from "react";
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import styles from './login.module.css';
import {
    Box,
    Logo,
    Typography,
    Input,
    PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {validationEmail} from "../../utils/utils";
import {login} from "../../services/actions/auth-action";


export const Login = () =>  {
    const {email, password, userName,accessToken} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const {state} = useLocation();

    const submit = (e) => {
        e.preventDefault();
        if (validationEmail(email)) {
            dispatch(login(email,password));
        }
    }

    if(accessToken){
        return(
            <Redirect to={state?.from || '/' } />
        )
    }

    return(
        <section className={styles.auth}>
            <h2 className="text text_type_main-medium">Войти</h2>
            <form className={styles.form} onSubmit={submit}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => dispatch({type: 'SET_EMAIL', payload: e.target.value})}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <PasswordInput onChange={e => dispatch({type: 'SET_PASSWORD', payload: e.target.value})}
                               value={password} name={'password'}/>
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