import React, {FC, SyntheticEvent} from 'react';
import styles from './order-item.module.css';
import clsx from 'clsx';
import {
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import {SET_MODAL_ORDER_FULL_STATE} from "../../services/actions/burger-constructor-action";
import {useHistory, useLocation} from "react-router-dom";
import {dateFormat} from "../../utils/utils";
import IDataIngredients, {IOrder} from "../../types";
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

interface IOrderItem{
    order: IOrder;
}

export const OrderItem : FC<IOrderItem> = ({order}) => {
    const {data} = useAppSelector((state:RootState) => state.burgerIngredients);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();
    let totalPrice = 0;
    let orderIngredients: Array<IDataIngredients> = [];
    order.ingredients.forEach(function (orderItem) {
        let element = data.find((item: IDataIngredients) => item._id === orderItem);
        if (element) {
            orderIngredients.push(element);
            totalPrice += element.price;
        }
    });

    const status: any = {
        done: "Выполнен",
        pending: "Готовится",
        created: "Создан"
    }
    const handleOpenClick = (e:SyntheticEvent<HTMLElement,Event>) => {
        e.preventDefault();
        dispatch({type: SET_MODAL_ORDER_FULL_STATE, isOpenModalOrderFull: true})
        history.push(location.pathname + '/' + order._id, {background: location});
    };


    return (
        <div className={styles.order} onClick={handleOpenClick}>
            <div className={styles.header}>
                <span className="text text_type_digits-default">#{order.number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {dateFormat(order.createdAt)}
                </span>
            </div>
            <div className={styles.name}>
                <h2 className="text text_type_main-default">{order.name}</h2>
                <p className="text text_type_main-default mt-4" style={{color: '#00cccc'}}>
                    {status[order.status]}
                </p>
            </div>
            <div className={styles.item}>
                <div className={styles.pics}>
                    {orderIngredients.slice(0, 6).map((item, index) => {
                        const opacity = index === 5 && orderIngredients.length > 6 ? 0.6 : 1;
                        return (
                            <div className={styles.icon} key={index} style={{zIndex: index}}>
                                <img className={styles.img} src={item.image_mobile} alt={item.name}
                                     style={{opacity: opacity}}/>
                                {index === 5 && orderIngredients.length > 6 ?
                                    <div className={clsx(styles.more, "text text_type_main-default")}>
                                        +{orderIngredients.length - 6}</div> : null}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.price}>
                    <div className="mr-2 text text_type_digits-default">{totalPrice}</div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>

        </div>

    )
}