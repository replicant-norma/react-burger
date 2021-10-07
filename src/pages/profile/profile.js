import React, {useEffect, useRef} from "react";
import styles from './profile.module.css';
import clsx from 'clsx';
import {NavLink, Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {
    Box,
    Typography,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {
    getProfile,
    logout,
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_NAME,
    updateProfile
} from "../../services/actions/auth-action";

export const Profile = () => {
    const {email, password, userName, userInfoFailed, backendMessage} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const inputRefName = useRef();
    const inputRefEmail = useRef();
    const inputRefPassword = useRef();

    useEffect(() => {
        dispatch(getProfile());
        location.state = '/profile';
    }, []);


    const submit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(email, password, userName))
    }

    const cancel = (e) => {
        e.preventDefault();
        dispatch(getProfile());
        dispatch({type: SET_PASSWORD, payload: ''});
    }

    const signOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        return (<Redirect to="/"/>)
    }

    return (
        <div className={styles.profile}>
            <ul className={styles.nav}>
                <li className={clsx("text text_type_main-medium", styles.item)}>
                    <NavLink to="/profile" exact={true}
                             className={styles.link}
                             activeClassName={styles.active}>
                        Профиль
                    </NavLink>
                </li>
                <li className={clsx("text text_type_main-medium", styles.item)}>
                    <NavLink to="/profile/orders"  exact={true}
                             className={styles.link}
                             activeClassName={styles.active}>
                        История заказов
                    </NavLink>
                </li>
                <li className={clsx("text text_type_main-medium", styles.item)}>
                    <Link to={"/login"} className={clsx("text_color_inactive", styles.link)}
                          onClick={signOut}>Выход</Link>
                </li>
            </ul>
            <div className={styles.content}>
                <form name="user_info" className={styles.content}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => dispatch({type: SET_USER_NAME, payload: e.target.value})}
                        icon={'EditIcon'}
                        value={userName}
                        name={'name'}
                        error={false}
                        onIconClick={e => inputRefName.current.focus()}
                        ref={inputRefName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={e => dispatch({type: SET_EMAIL, payload: e.target.value})}
                        icon={'EditIcon'}
                        value={email}
                        name={'email'}
                        error={false}
                        onIconClick={e => inputRefEmail.current.focus()}
                        ref={inputRefEmail}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => dispatch({type: SET_PASSWORD, payload: e.target.value})}
                        icon={'EditIcon'}
                        value={password}
                        name={'password'}
                        error={false}
                        onIconClick={e => inputRefPassword.current.focus()}
                        ref={inputRefPassword}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <div className={styles.message}>{backendMessage}</div>
                    <div className={styles.action}>
                        <Button type="secondary" onClick={cancel}>Отмена</Button>
                        <Button type="primary" onClick={submit}>Сохранить</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;