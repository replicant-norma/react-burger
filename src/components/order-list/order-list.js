import React, {useEffect} from 'react';
import styles from './order-list.module.css';
import {
    Box,
    Typography,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderItem} from "../order-item/order-item";

export const OrderList = (props) => {
    return (
        <div className={styles.content}>
            {props.orders.map((el, index) => {
                return <OrderItem key={el._id} order={el}/>
            })
            }
        </div>
    );

}