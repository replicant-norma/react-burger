import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from '../../utils/data-prop.js';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

{/* Собираем набор ингридиентов из правой панели экрана */}

function BurgerConstructor(props){
    const prices = props.data;
    let total = prices.reduce(function(sum, current){
            return sum+current.price;
    }, 0);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOrderClick = () =>{
        setIsOpenModal(true);
    };

    const handleCloseClick = () =>{
        setIsOpenModal(false);
    };

    const pressEsc = (e) =>{
        if ((e.charCode || e.keyCode) === 27) {
            setIsOpenModal(false);
        }
    };

     useEffect(() => {
        document.body.addEventListener('keydown', pressEsc);
        return () =>{
        document.body.removeEventListener('keydown', pressEsc);
        }
    }, []);


    return (
        <>
        <IngredientList data={props.data} />
        <div className={styles.order}>
            <div className={styles.totalPrice}>
              <span className="text text_type_digits-medium">{total}</span>
              <span className="ml-2"><CurrencyIcon type="primary" /></span>
            </div>
            <Button onClick={handleOrderClick}>Оформить заказ</Button>
        </div>
        <div onClick={handleCloseClick}>
        <Modal isOpen={isOpenModal} onClose={handleCloseClick}>
            <OrderDetails />
        </Modal>
        </div>
        </>
    )
}

BurgerConstructor.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}

export default BurgerConstructor;