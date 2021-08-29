import React, {useEffect, useState} from 'react';
import styles from './order-details.module.css';
import {Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import doneImgPath from '../../images/done.gif';

function OrderDetails(props) {
    return (
        <div className={styles.details}>
            <div className={styles.order}>
                <h1 className="text text_type_digits-large">034536</h1>
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