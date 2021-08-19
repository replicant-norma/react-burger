import React from 'react';
import styles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import { Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

{/* Собираем список ингредиентов */}

function IngredientList(props){
    const pList = props.data.map(function(el, index){
        if (el.type == "main" || "sauce"){
            return(
                <Ingredient key={index} position={props.position}
                         name={el.name}
                         image={el.image_mobile}
                         price={el.price}
                />)
        }
    });
    return(
        <div className={styles.ingredient_list}>

                {pList}

        </div>
    )
}

export default IngredientList;