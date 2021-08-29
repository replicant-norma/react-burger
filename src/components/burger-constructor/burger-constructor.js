import React, {useState, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from '../../utils/data-prop.js';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

{/* Собираем набор ингридиентов из правой панели экрана */
}

function BurgerConstructor(props) {
    const prices = props.data;
    const total = useMemo(() => prices.reduce(function (sum, current) {
        return sum + current.price;
    }, 0), [prices]);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenClick = () => {
        setIsOpenModal(true);
    };

    const handleCloseClick = () => {
        setIsOpenModal(false);
    };
    return (
        <>
            <IngredientList data={props.data}/>
            <div className={styles.order}>
                <div className={styles.totalPrice}>
                    <span className="text text_type_digits-medium">{total}</span>
                    <span className="ml-2"><CurrencyIcon type="primary"/></span>
                </div>
                <Button onClick={handleOpenClick}>Оформить заказ</Button>
            </div>

            {isOpenModal && (<Modal onClose={handleCloseClick}>
                    <OrderDetails/>
                </Modal>
            )}
        </>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}

export default BurgerConstructor;