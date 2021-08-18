import React from 'react';
import {
    CurrencyIcon,
    Typography,
    Box,
    DragIcon,
    DeleteIcon,
    LockIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.css';

{/* Блок отображения ингридиента */}

function Ingredient (props){
    const dragIcon = () => {
        if (props.position != "top" && props.position != "bottom") {
            return (<DragIcon type="primary" />);
        }
    }
    const lockIcon = () => {
        if (props.position != "top" && props.position != "bottom") {
            return (<DeleteIcon type="secondary" />);
        } else
        {
            return (<LockIcon type="secondary" />);
        }
    }
    return(
        <div className="ingredient-position">
              <div className="ingredient-dnd">
                  {dragIcon()}
              </div>
        <div className={"ingredient "+ props.position}>
            <div className="ingredient-image">
                <img src={props.image} />
            </div>
            <div className="ingredient-name">
                <h3 className="text text_type_main-default">{props.name}</h3>
            </div>
            <div className="ingredient-price">
                <span className="text text_type_digits-default">{props.price}</span>
                <span><CurrencyIcon type="primary" /></span>
            </div>
            <div className="ingredient-action">
                {lockIcon()}
            </div>
          </div>
        </div>
    )
}

export default Ingredient;