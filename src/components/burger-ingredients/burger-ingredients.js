import React from 'react';
import './burger-ingredients.css';
import Ingredient from "../ingredient/ingredient";
import IngredientList from "../ingredient-list/ingredient-list";

{/* Собираем набор ингридиентов из правой панели экрана */}

function BurgerIngredients(props){
    return (
        <>
        <Ingredient position="top" name="Краторная булка N-200i"
                    price="1255"
                    image="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />

        <IngredientList data={props.data} position="middle" />
        <Ingredient position="bottom" name="Краторная булка N-200i"
                price="1255"
                image="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
        </>
    )
}

export default BurgerIngredients;