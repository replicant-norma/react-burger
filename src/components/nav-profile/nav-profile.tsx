import styles from "../../pages/profile/profile.module.css";
import clsx from "clsx";
import {Link, NavLink, useHistory, useLocation} from "react-router-dom";
import React, {FC, SyntheticEvent} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/auth-action";
import {setCookie} from "../../utils/utils";


export const NavProfile :FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(logout());
        setCookie('accessToken', '', {expires: -1});
        localStorage.removeItem('refreshToken');
        history.push('/login');
    }


    return (
        <ul className={styles.nav}>
            <li className={clsx("text text_type_main-medium", styles.item)}>
                <NavLink to="/profile" exact={true}
                         className={styles.link}
                         activeClassName={styles.active}>
                    Профиль
                </NavLink>
            </li>
            <li className={clsx("text text_type_main-medium", styles.item)}>
                <NavLink to="/profile/orders" exact={true}
                         className={styles.link}
                         activeClassName={styles.active}>
                    История заказов
                </NavLink>
            </li>
            <li className={clsx("text text_type_main-medium", styles.item)}>
                <Link to="/logout" className={clsx("text_color_inactive", styles.link)}
                      onClick={signOut}>Выход</Link>
            </li>
        </ul>
    )
}