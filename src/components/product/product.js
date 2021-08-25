import React from 'react';
import { Box, Typography, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';

{/* Блок отображения продукта из левого экрана*/}

function Product(props){
    return(
        <div className={styles.product}>
            {props.count > 0 ? <Counter count={props.count} size="default" /> : null}
            <div className={styles.img}>
                <img src={props.img} alt={props.name} />
            </div>
            <div className={clsx(styles.price, "mt-1 mb-1")}>
                <span className="text_type_digits-default mr-1">{props.price}</span>
                <span className="mt-1"><CurrencyIcon type="primary"/></span>
            </div>
            <div className={styles.name}>
                <h3 className="text text_type_main-default">{props.name}</h3>
            </div>
        </div>
    )
}

export default Product;