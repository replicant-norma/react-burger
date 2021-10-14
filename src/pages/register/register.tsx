import React, {useRef} from "react";
import {Link} from 'react-router-dom';
import styles from './register.module.css';
import {
    Input,
    PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {validationEmail} from "../../utils/utils";
import {register, SET_EMAIL, SET_USER_NAME} from "../../services/actions/auth-action";
import {RootState} from "../../services/store";


export const Register = () => {
    const {email, password, userName, backendMessage} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const submit = (e: any) => {
        e.preventDefault();
        if (validationEmail(email)) {
            dispatch(register(email, password, userName));
        }
    }

    return (
        <section className={styles.register}>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <form className={styles.form} onSubmit={submit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => dispatch({type: SET_USER_NAME, payload: e.target.value})}
                    // @ts-ignore
                    value={userName}
                    name={'name'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
                    // @ts-ignore
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <PasswordInput onChange={e => dispatch({type: 'SET_PASSWORD', payload: e.target.value})}
                    // @ts-ignore
                               value={password}
                               name={'password'}/>
                <div className={styles.message}>{backendMessage}</div>
                <div className={styles.button}>
                    <Button type="primary">Зарегистрироваться</Button>
                </div>
            </form>
            <div className={styles.login}>
                <p className="text text_type_main-default text_color_inactive"> Уже зарегистрированы? <Link
                    className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </section>
    );
}

export default Register;