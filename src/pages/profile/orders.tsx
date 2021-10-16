import React, {useEffect} from "react";
import styles from './orders.module.css';
import {useLocation} from "react-router-dom";
import {OrderList} from "../../components/order-list/order-list";
import {WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED} from "../../services/actions/ws-auth-action";
import {NavProfile} from "../../components/nav-profile/nav-profile";
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";


export const Orders = () => {
    const {wsConnected, ordersAll} = useAppSelector((state:RootState) => state.wsAuthReducer);
    const dispatch = useAppDispatch();
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