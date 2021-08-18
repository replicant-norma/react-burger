import React from 'react';
import './burger-ingredients.css';
import Ingredient from "../ingredient/ingredient";
import IngredientList from "../ingredient-list/ingredient-list";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


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

        <IngredientList data={props.data} position="middle" />
        <Ingredient position="bottom" name="Краторная булка N-200i"
                price="1255"
                image="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />

        <div className="order">
            <div className="totalPrice">
              <span className="text text_type_digits-medium">{total}</span>
              <span className="ml-2"><CurrencyIcon type="primary" /></span>
            </div>
            <Button>Оформить заказ</Button>
        </div>
        </>
    )
}

export default BurgerIngredients;