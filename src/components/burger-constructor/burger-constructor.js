import React from 'react';
import styles from './burger-constructor.module.css';
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from '../../utils/data-prop.js';

{/* Собираем набор ингридиентов из правой панели экрана */}

function BurgerConstructor(props){
    const prices = props.data;
    let total = prices.reduce(function(sum, current){
            return sum+current.price;
    }, 0);
    return (
        <>
        <IngredientList data={props.data} />
        <div className={styles.order}>
            <div className={styles.totalPrice}>
              <span className="text text_type_digits-medium">{total}</span>
              <span className="ml-2"><CurrencyIcon type="primary" /></span>
            </div>
            <Button>Оформить заказ</Button>
        </div>
        </>
    )
}

BurgerConstructor.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}

export default BurgerConstructor;