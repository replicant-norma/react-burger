import React, {useContext, useEffect, useState} from 'react';
import {Box, Typography, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import dataProp from "../../utils/data-prop";

{/* Блок отображения продукта из левого экрана*/
}

function Product(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);

    const handleOpenClick = () => {
        setIsOpen(true);
        setCount(count + 1);
    }

    const handleCloseClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={styles.product} onClick={handleOpenClick}>
                {count > 0 ? <Counter count={count} size="default"/> : null}
                <div className={styles.img}>
                    <img src={props.data.image} alt={props.data.name}/>
                </div>
                <div className={clsx(styles.price, "mt-1 mb-1")}>
                    <span className="text_type_digits-default mr-1">{props.data.price}</span>
                    <span className="mt-1"><CurrencyIcon type="primary"/></span>
                </div>
                <div className={styles.name}>
                    <h3 className="text text_type_main-default">{props.data.name}</h3>
                </div>
            </div>
            {isOpen && (<Modal onClose={handleCloseClick} title="Детали ингредиента">
                    <IngredientDetails data={props.data}/>
                </Modal>
            )}
        </>
    )
}

Product.propTypes = {
    data: dataProp.isRequired
}

export default Product;