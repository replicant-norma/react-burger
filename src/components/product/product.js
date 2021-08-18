import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.css';

{/* Блок отображения продукта из левого экрана*/}

function Product(props){
    return(
        <div className="product">
            <div className="product-img">
                <img src={props.img} />
            </div>
            <div className="product-price mt-1 mb-1">
                <span className="text_type_digits-default mr-1">{props.price}</span>
                <span className="mt-1"><CurrencyIcon type="primary"/></span>
            </div>
            <div className={styles.productName}>
                <h3 className="text text_type_main-default">{props.name}</h3>
            </div>
        </div>
    )
}

export default Product;