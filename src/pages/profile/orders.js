import React, {useEffect, useRef} from "react";
import styles from './orders.module.css';
import clsx from 'clsx';
import {NavLink, Link, Redirect, useLocation} from "react-router-dom";
import {
    Box,
    Typography,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services/actions/auth-action";
import {OrderList} from "../../components/order-list/order-list";
import {WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED} from "../../services/actions/ws-auth-action";


export const Orders = () => {
    const {wsConnected, ordersAll} = useSelector((state) => state.wsAuthReducer);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!wsConnected) dispatch({type: WS_AUTH_CONNECTION_START});
        location.state = '/profile/orders';
        return () => {
            dispatch({type: WS_AUTH_CONNECTION_CLOSED})
        }
    }, [])

    const signOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        return (<Redirect to="/"/>)
    }

    if (!ordersAll) {
        return (
            <div className={styles.load}>Загрузка данных...</div>
        )
    }

    return (ordersAll &&
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
                    <NavLink to="/profile/orders" exact={true}
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
                <OrderList orders={ordersAll.orders}/>
            </div>
        </div>
    );
}

export default Orders;