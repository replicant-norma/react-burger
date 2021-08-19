import React from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from "../ingredient/ingredient";
import IngredientList from "../ingredient-list/ingredient-list";
import {Box, Typography, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor/burger-constructor";


{/* Собираем набор ингридиентов из правой панели экрана */}

function BurgerIngredients(props){
    const prices = props.data;
    let total = prices.reduce(function(sum, current){
            return sum+current.price;
    }, 0);
    return (
        <>
        <Ingredient position="top" name="Краторная булка N-200i"
                    price="1255"
                    image="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
        <div className={styles.scroll_wrapper}>
        <IngredientList data={props.data} position="middle" />
        </div>
        <Ingredient position="bottom" name="Краторная булка N-200i"
                price="1255"
                image="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
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

const dataProp = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

BurgerIngredients.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}

export default BurgerIngredients;