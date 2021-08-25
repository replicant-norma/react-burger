import React from 'react';
import styles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import {Box, Typography, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

{/* Собираем список ингредиентов */}

function IngredientList(props){
    const pList = props.data.map(function(el, index){
        if (el.type == "main" || "sauce"){
            return(
                /*<Ingredient key={index} position={props.position}
                         name={el.name}
                         image={el.image_mobile}
                         price={el.price}
                />*/
                <>
                    <div className={styles.wrapper}>
                    <DragIcon type="primary" key={index} />
                    <ConstructorElement
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                        key={index}
                    />
                    </div>
                </>
                )
        }
    });
    return(
        <>
        <div className={styles.flex}>
            <ConstructorElement
                type="top"
                isLocked="true"
                text="Краторная булка N-200i (верх)"
                price="1255"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            />
        <div className={clsx(styles.list, styles.flex)}>

                {pList}

        </div>
            <ConstructorElement
                type="bottom"
                isLocked="true"
                text="Краторная булка N-200i (верх)"
                price="1255"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            />
        </div>
        </>
    )
}

export default IngredientList;