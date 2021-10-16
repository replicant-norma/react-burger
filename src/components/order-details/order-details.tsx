import React, {useEffect, FC} from 'react';
import styles from './order-details.module.css';
import clsx from 'clsx';
import doneImgPath from '../../images/done.gif';
import {orderRequest} from "../../services/actions/burger-constructor-action";
import IDataIngredients from "../../types";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

export const OrderDetails : FC = () => {
    const {orderDetails, orderNumber} = useAppSelector((state) => state.burgerConstructor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let idx: Array<string> = [];
        orderDetails.map(function (el: IDataIngredients, index:number) {
            idx.push(el._id);
        })
        let requestData: {} = {
            "ingredients": idx
        }
        dispatch(orderRequest(requestData));
    }, [dispatch]);

    return (
        <div className={styles.details}>
            <div className={styles.order}>
                <h1 className="text text_type_digits-large">{orderNumber}</h1>
            </div>
            <h2 className={clsx(styles.label, "mt-8 text text_type_text-small")}>индентификатор заказа</h2>
            <div className={styles.icon}>
                <img src={doneImgPath} width="120" alt="Готово"/>
            </div>
            <div className={styles.summary}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className={clsx(styles.blue, "text text_type_main-default")}>Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div>
    )
}
