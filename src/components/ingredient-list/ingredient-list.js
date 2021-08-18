import React from 'react';
import styles from './ingredient-list.css';
import Ingredient from "../ingredient/ingredient";

{/* Собираем список ингредиентов */}

function IngredientList(props){
    const pList = props.data.map(function(el){
        if (el.type == "main" || "sauce"){
            return(
                <Ingredient position={props.position}
                         name={el.name}
                         image={el.image_mobile}
                         price={el.price}
                />)
        }
    });
    return(
        <div className="ingredient-list">

                {pList}

        </div>
    )
}

export default IngredientList;