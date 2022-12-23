import React, {useMemo, FC, SyntheticEvent} from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useHistory} from "react-router-dom";
import {
    RESET_ORDER_DETAILS,
    SET_MODAL_ORDER_STATE,
    SET_ORDER_NUMBER
} from "../../services/actions/burger-constructor-action";
import {OrderDetails} from "../order-details/order-details";
import Modal from "../modal/modal";
import {getCookie} from "../../utils/utils";
import IDataIngredients from '../../types';
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

{/* Собираем набор ингридиентов из правой панели экрана */
}

export const BurgerConstructor : FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const {orderDetails, isOpenModalOrder, haveBun} = useAppSelector((state) => state.burgerConstructor);
    const accessToken = getCookie('accessToken');
    const total = useMemo( ():number => orderDetails.reduce(function (sum:number, current: IDataIngredients) {
        if (current.type === 'bun') return sum + current.price * 2;
        return sum + current.price;
    }, 0), [orderDetails]);

    const handleOpenClick = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (accessToken && haveBun) {
            dispatch({type: SET_MODAL_ORDER_STATE, isOpenModalOrder: true})
        }
        if (!accessToken && haveBun) {
            history.push("/login");
        }
    };

    const handleCloseClickOrder = () => {
        dispatch({type: SET_MODAL_ORDER_STATE, isOpenModalOrder: false});
        dispatch({type: SET_ORDER_NUMBER, orderNumber: null});
        dispatch({type: RESET_ORDER_DETAILS});
    };

    return (
        <>
            <IngredientList/>
            {orderDetails.length > 0 && (
                <div className={styles.order}>
                    <div className={styles.totalPrice}>
                        <span className="text text_type_digits-medium">{total}</span>
                        <span className="ml-2"><CurrencyIcon type="primary"/></span>
                    </div>
                    {haveBun &&
                    <Button type="primary" onClick={handleOpenClick}>Оформить заказ</Button>}
                </div>)
            }
            {isOpenModalOrder && (<Modal onClose={handleCloseClickOrder}>
                    <OrderDetails/>
                </Modal>
            )}

        </>
    )
}


export default BurgerConstructor;