import React, {useState, useMemo, useContext} from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from '../../utils/data-prop.js';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

{/* Собираем набор ингридиентов из правой панели экрана */
}

function BurgerConstructor(props) {
    const dispatch = useDispatch();
    const {orderDetails, isOpenModalOrder, haveBun} = useSelector((state) => state.burgerConstructor);
    const {accessToken, tryOrderRequest} = useSelector((state) => state.auth);
    const total = useMemo(() => orderDetails.reduce(function (sum, current) {
        if (current.type === 'bun') return sum + current.price * 2;
        return sum + current.price;
    }, 0), [orderDetails]);

    const handleOpenClick = (e) => {
        if (!accessToken) {
            dispatch({type: 'TRY_ORDER_REQUEST', payload: true});
        } else {
            dispatch({type: 'TRY_ORDER_REQUEST', payload: false})
            dispatch({type: 'SET_MODAL_ORDER_STATE', isOpenModalOrder: true});
        }
    };

    if (!accessToken && tryOrderRequest) {
        return (
            <Redirect to={'/login'}/>
        )
    }

    const handleCloseClick = () => {
        dispatch({type: 'SET_MODAL_ORDER_STATE', isOpenModalOrder: false});
        dispatch({type: 'SET_ORDER_NUMBER', orderNumber: null});
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
                    <Button type="primary" onClick={handleOpenClick}>Оформить заказ</Button>
                </div>)
            }
            {isOpenModalOrder && (<Modal onClose={handleCloseClick}>
                    <OrderDetails/>
                </Modal>
            )}
        </>
    )
}

/*BurgerConstructor.propTypes =
{
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired;
}
*/

export default BurgerConstructor;