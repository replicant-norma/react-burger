import React, {useState, useMemo, useContext, useCallback} from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import {SET_MODAL_ORDER_STATE, SET_ORDER_NUMBER} from "../../services/actions/burger-constructor-action";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

{/* Собираем набор ингридиентов из правой панели экрана */
}

function BurgerConstructor(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {orderDetails, isOpenModalOrder, haveBun} = useSelector((state) => state.burgerConstructor);
    const {accessToken} = useSelector((state) => state.auth);
    const total = useMemo(() => orderDetails.reduce(function (sum, current) {
        if (current.type === 'bun') return sum + current.price * 2;
        return sum + current.price;
    }, 0), [orderDetails]);

    const handleOpenClick = (e) => {
        e.preventDefault();
        if (accessToken && haveBun) {
            dispatch({type: SET_MODAL_ORDER_STATE, isOpenModalOrder: true})
        }
        if (!accessToken){
            history.push("/login");
        }
    };

    const handleCloseClickOrder = () => {
        dispatch({type: SET_MODAL_ORDER_STATE, isOpenModalOrder: false});
        dispatch({type: SET_ORDER_NUMBER, orderNumber: null});
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
            {isOpenModalOrder && (<Modal onClose={handleCloseClickOrder}>
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