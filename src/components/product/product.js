import React, {useEffect, useState} from 'react';
import { Box, Typography, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";

{/* Блок отображения продукта из левого экрана*/}

function Product(props){

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [count, setCount] = useState(0);

    const handleOpenClick = () =>{
        setIsOpenModal(true);
        setCount(count+1);
    };
    const handleCloseClick = () =>{
        setIsOpenModal(false);
    };
    const pressEsc = (e) =>{
        if ((e.charCode || e.keyCode) === 27) {
            setIsOpenModal(false);
        }
    };
    useEffect(() => {
        document.body.addEventListener('keydown', pressEsc);
        return () =>{
            document.body.removeEventListener('keydown', pressEsc);
        }
    }, []);

    return(
        <>
        <div className={styles.product} onClick={handleOpenClick}>
            {count > 0 ? <Counter count={count} size="default" /> : null}
            <div className={styles.img}>
                <img src={props.image} alt={props.name} />
            </div>
            <div className={clsx(styles.price, "mt-1 mb-1")}>
                <span className="text_type_digits-default mr-1">{props.price}</span>
                <span className="mt-1"><CurrencyIcon type="primary"/></span>
            </div>
            <div className={styles.name}>
                <h3 className="text text_type_main-default">{props.name}</h3>
            </div>
        </div>
        <div onClick={handleCloseClick}>
        <Modal isOpen={isOpenModal} onClose={handleCloseClick} title="Детали ингредиента" >
            <IngredientDetails {...props} />
        </Modal>
        </div>
        </>
    )
}

Product.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}

export default Product;