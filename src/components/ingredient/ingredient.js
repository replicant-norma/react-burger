import React from 'react';
import styles from './ingredient.module.css';
import {
    CurrencyIcon,
    Typography,
    Box,
    DragIcon,
    DeleteIcon,
    LockIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

{/* Блок отображения ингридиента */
}
{/* Данный компонент не актуален, в проекте используется <ConstructorElement>*/
}

function Ingredient(props) {
    const dragIcon = () => {
        if (props.position !== "top" && props.position !== "bottom") {
            return (<DragIcon type="primary"/>);
        }
    }
    const lockIcon = () => {
        if (props.position !== "top" && props.position !== "bottom") {
            return (<DeleteIcon type="secondary"/>);
        } else {
            return (<LockIcon type="secondary"/>);
        }
    }
    const stylePosition = () => {
        if (props.position == "top") return styles.top;
        if (props.position == "bottom") return styles.bottom;
    }
    return (
        <div className={clsx(styles.position)}>
            <div className={styles.dnd}>
                {dragIcon()}
            </div>
            <div className={clsx(styles.ingredient, stylePosition())}>
                <div className={styles.image}>
                    <img src={props.image} alt={props.name}/>
                </div>
                <div className={styles.name}>
                    <h3 className="text text_type_main-default">{props.name}</h3>
                </div>
                <div className={styles.price}>
                    <span className="text text_type_digits-default">{props.price}</span>
                    <span><CurrencyIcon type="primary"/></span>
                </div>
                <div className={styles.action}>
                    {lockIcon()}
                </div>
            </div>
        </div>
    )
}

export default Ingredient;