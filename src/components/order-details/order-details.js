import React, {useContext, useEffect, useState} from 'react';
import styles from './order-details.module.css';
import {Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import doneImgPath from '../../images/done.gif';
import {BurgerConstructorContext} from "../../services/appContext";
import {getOrder} from '../../utils/burger-api';

function OrderDetails(props) {
    const {state, setState} = useContext(BurgerConstructorContext);
    const ingredients = () => {
        let idx = [];
        state.orderDetails.map(function (el, index) {
            idx.push(el._id);
        })
        return idx;
    }
    useEffect(() => {
        let requestData = {
            "ingredients": ingredients()
        }
        getOrder(requestData)
            .then((data) => setState({...state, orderNumber: data.order.number}))
            .catch((e) => console.log(e))
    }, [state.orderDetails]);

    return (
        <div className={styles.details}>
            <div className={styles.order}>
                <h1 className="text text_type_digits-large">{state.orderNumber}</h1>
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

export default OrderDetails;