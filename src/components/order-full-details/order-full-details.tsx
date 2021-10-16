import React, {useEffect, FC} from 'react';
import styles from './order-full-details.module.css';
import clsx from 'clsx';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useLocation, useParams} from "react-router-dom";
import {dateFormat} from "../../utils/utils";
import {WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START} from "../../services/actions/ws-auth-action";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action";
import IDataIngredients, {IOrder, IIngredientsOrder} from "../../types";
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

export const OrderFullDetails: FC = ():any => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {data, doneLoad} = useAppSelector((state:RootState) => state.burgerIngredients);
    const orders = useAppSelector((state:RootState) => state.wsReducer.ordersAll);
    const ordersAuth = useAppSelector((state:RootState) => state.wsAuthReducer.ordersAll);
    const ordersAll = location.pathname.indexOf('/profile/orders') >= 0 ? ordersAuth : orders;

    const {id} = useParams<{ id?: string }>();
    const status: any = {
        done: "Выполнен",
        pending: "Готовится",
        created: "Создан"
    }

    useEffect(() => {
        location.pathname.indexOf('/profile/orders') >= 0
            ? dispatch({type: WS_AUTH_CONNECTION_START})
            : dispatch({type: WS_CONNECTION_START})
        return () => {
            location.pathname.indexOf('/profile/orders') >= 0
                ? dispatch({type: WS_AUTH_CONNECTION_CLOSED})
                : dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])

    if (!ordersAll) {
        return (<div>Загрузка данных</div>);
    }

    const order: IOrder|any = ordersAll.orders.find((item: IOrder) => item._id === id);
    let ingredients: Array<IIngredientsOrder> = Object.values(order.ingredients.reduce(function (acc: Array<string>, item: string) {
        const ingredient = data.find((element: IDataIngredients) => element._id === item);
        if (acc.hasOwnProperty(item)) {
            // @ts-ignore
            acc[item] = {...acc[item], cnt: ++acc[item].cnt}
        } else {
            // @ts-ignore
            acc[item] = {...acc[item], id: item, cnt: 1, data: ingredient}
        }
        return acc
    }, []));

    return (doneLoad && ingredients &&
        <div className={styles.wrapper}>
            <div className={styles.order}>
                <div className={styles.header}>
                    <span className={clsx(styles.number, "text text_type_digits-default mb-10")}>
                        #{order.number}
                    </span>
                    <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
                    <span className={clsx(styles.status, "text_type_main-default")}>{status[order.status]}</span>
                </div>
                <div className={styles.items}>
                    <h5 className="text text_type_main-medium mb-6">Состав:</h5>
                    <div className={styles.list}>
                        {ingredients.map((item, index) => {
                            return (<div className={styles.item} key={index}>
                                    <div className={styles.icon}>
                                        <img src={item.data.image_mobile} alt={item.data.name}/>
                                    </div>
                                    <h3 className={clsx(styles.name, "text text_type_main-default")}>
                                        {item.data.name}
                                    </h3>
                                    <div className={styles.price}>
                                    <span className="text text_type_digits-default">
                                        {item.cnt} x {item.data.price}
                                    </span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.footer}>
                    <span className="text text_type_main-default text_color_inactive">
                        {dateFormat(order.createdAt)}
                    </span>
                        <div className={styles.price}>
                            <span className="text text_type_digits-default">
                                {ingredients.reduce(function (sum, item) {
                                    return sum += item.cnt * item.data.price;
                                }, 0)}
                            </span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default OrderFullDetails;