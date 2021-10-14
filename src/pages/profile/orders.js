import React, {useEffect, useRef} from "react";
import styles from './orders.module.css';
import clsx from 'clsx';
import {NavLink, Link, Redirect, useLocation, useHistory} from "react-router-dom";
import {
    Box,
    Typography,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {OrderList} from "../../components/order-list/order-list";
import {WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED} from "../../services/actions/ws-auth-action";
import {NavProfile} from "../../components/nav-profile/nav-profile";


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
    }, [dispatch])

    if (!ordersAll) {
        return (
            <div className={styles.load}>Загрузка данных...</div>
        )
    }

    return (
        <div className={styles.profile}>
            <NavProfile/>
            <div className={styles.content}>
                <OrderList orders={ordersAll.orders || []}/>
            </div>
        </div>
    );
}

export default Orders;