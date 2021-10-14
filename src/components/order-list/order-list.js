import React from 'react';
import styles from './order-list.module.css';
import {
    Box,
    Typography,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderItem} from "../order-item/order-item";
import {useDispatch, useSelector} from "react-redux";

export const OrderList = (props) => {
    const {isOpenModalOrder} = useSelector((state) => state.burgerConstructor);
    const dispatch = useDispatch();
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