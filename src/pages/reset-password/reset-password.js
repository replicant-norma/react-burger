import React, {useRef, useEffect} from "react";
import {Link} from 'react-router-dom';
import styles from './reset-password.module.css';
import {validationPassword} from '../../utils/utils';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {resetPasswordRequest} from "../../services/actions/reset-password-action";
import {
    Box,
    Logo,
    Typography,
    Input,
    PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPassword = () => {
    const {password, token, newPasswordSuccess} = useSelector((state) => state.resetPassword);
    //const {resetPasswordSuccess} = useSelector((state) => state.forgotPassword);
    //const {accessToken} = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const submit = (e) => {
        e.preventDefault();
        if (validationPassword(password)) {
            dispatch(resetPasswordRequest(password, token));
        } else {
            console.log('Пароль слишком короткий');
        }
    }

    /*if (accessToken || !resetPasswordSuccess) {
        return (
            <Redirect to="/"/>
        )
    }*/

    if (newPasswordSuccess) {
        return (
            <Redirect to={{pathname: '/login'}}/>
        )
    }

    return (
        <section className={styles.reset}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <form className={styles.form} onSubmit={submit}>
                <PasswordInput
                    onChange={e => dispatch({type: 'SET_PASSWORD', payload: e.target.value})}
                    value={password}
                    name={'password'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => dispatch({type: 'SET_TOKEN', payload: e.target.value})}
                    icon={''}
                    value={token}
                    name={'token'}
                    size={'default'}
                />
                <div className={styles.button}>
                    <Button type="primary">Сохранить</Button>
                </div>
            </form>
            <div className={styles.login}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link
                    className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </section>
    );
}

export default ResetPassword;