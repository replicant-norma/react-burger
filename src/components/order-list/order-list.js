import React, {useEffect} from 'react';
import styles from './order-list.module.css';
import {
    Box,
    Typography,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderItem} from "../order-item/order-item";

export const OrderList = (props) => {

    if (!props.orders) {
        return (
            <div className={styles.noOrders}>Заказов пока нет</div>
        )
    }

    const list = props.orders.map(function (el, index) {
        return (
            <OrderItem key={el._id} order={el}/>
        )

    })
    return (
        <div className={styles.content}>
            {list}
        </div>

    );

}