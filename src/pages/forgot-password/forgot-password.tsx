import React, {SyntheticEvent, useRef} from "react";
import {Link} from 'react-router-dom';
import styles from './forgot-password.module.css';
import {validationEmail} from '../../utils/utils';
import {useDispatch, useSelector} from "react-redux";
import {
    forgotPasswordRequest,
    SET_ERROR_INPUT,
    SET_ERROR_INPUT_TEXT
} from "../../services/actions/forgot-password-action";
import {Redirect, useHistory} from "react-router-dom";
import {
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {SET_EMAIL} from "../../services/actions/auth-action";
import {RootState} from "../../services/store";

export const ForgotPassword = () => {
    const {email, errorInput, errorInputText, resetPasswordSuccess, backendMessage} = useSelector((state: RootState) => state.forgotPassword);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const submit = (e:SyntheticEvent<HTMLElement,Event>) => {
        e.preventDefault();
        // @ts-ignore
        if (validationEmail(inputRef.current.value)) {
            dispatch({type: SET_ERROR_INPUT, payload: false});
            // @ts-ignore
            dispatch(forgotPasswordRequest(inputRef.current.value));
        } else {
            dispatch({type: SET_ERROR_INPUT, payload: true});
            dispatch({type: SET_ERROR_INPUT_TEXT, payload: 'Некорректный email'});
        }
    }

    if (resetPasswordSuccess) {
        return (
            <Redirect from="/forgot-password" to={{pathname: "/reset-password"}}/>
        )
    }

    /*if (accessToken) {
        return (
            <Redirect to="/" />
        )
    }*/

    return (
        <section className={styles.reset}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <form className={styles.form} onSubmit={submit}>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
                    icon={undefined}
                    value={email}
                    name={'email'}
                    error={errorInput}
                    ref={inputRef}
                    errorText={errorInputText}
                    size={'default'}
                />
                <div className={styles.message}>{backendMessage}</div>
                <div className={styles.button}>
                    <Button type="primary">Восстановить</Button>
                </div>
            </form>
            <div className={styles.login}>
                <p className="text text_type_main-default text_color_inactive"> Вспомнили пароль? <Link
                    className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </section>
    );
}

export default ForgotPassword;