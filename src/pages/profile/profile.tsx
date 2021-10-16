import React, {FC, useEffect, useRef} from "react";
import styles from './profile.module.css';
import {useLocation} from "react-router-dom";
import {
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getProfile,
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_NAME,
    updateProfile
} from "../../services/actions/auth-action";
import {NavProfile} from "../../components/nav-profile/nav-profile";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

interface IProfile {

}

export const Profile: FC<IProfile> = (): any => {
    const {email, password, userName, backendMessage, userInfoSuccess} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const inputRefName = useRef();
    const inputRefEmail = useRef();
    const inputRefPassword = useRef();

    useEffect(() => {
        dispatch(getProfile());
        location.state = '/profile';
    }, []);


    const submit = (e: any) => {
        e.preventDefault();
        dispatch(updateProfile(email, password, userName))
    }

    const cancel = (e: any) => {
        e.preventDefault();
        dispatch(getProfile());
        dispatch({type: SET_PASSWORD, payload: ''});
    }

    return (userInfoSuccess &&
        <div className={styles.profile}>
            <NavProfile/>
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
                        // @ts-ignore
                        onIconClick={e => inputRefName.current.focus()}
                        // @ts-ignore
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
                        // @ts-ignore
                        onIconClick={e => inputRefEmail.current.focus()}
                        // @ts-ignore
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
                        // @ts-ignore
                        onIconClick={e => inputRefPassword.current.focus()}
                        // @ts-ignore
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