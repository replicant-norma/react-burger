import React, {FC} from 'react';
import styles from './order-list.module.css';
import {OrderItem} from "../order-item/order-item";
import {IOrder} from "../../types";

interface IOrderList{
    orders: Array<IOrder>|[]
}

export const OrderList: FC<IOrderList> = ({orders}) => {
    return (
        <div className={styles.content}>
            {orders.map((el, index) => {
                return <OrderItem key={el._id} order={el} />
            })
            }
        </div>
    );

}