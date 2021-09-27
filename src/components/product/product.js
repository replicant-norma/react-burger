import React, {useContext, useEffect, useState, useMemo} from 'react';
import {Box, Typography, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';
import dataProp from "../../utils/data-prop";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Route, useHistory, useLocation, Link} from "react-router-dom";
import {SET_MODAL_DETAILS_STATE} from "../../services/actions/burger-ingredients-action";


{/* Блок отображения продукта из левого экрана*/
}

export const Product = (props) => {
    const {haveBun, orderDetails} = useSelector(state => state.burgerConstructor);
    const {isOpenModalDetails} = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const count = useMemo(() =>
        orderDetails.filter((item) => item._id === props.data._id).length, [orderDetails])


    const handleOpenClick = () => {
        history.push('/ingredients/' + props.data._id, {background: location});
        dispatch({type: SET_MODAL_DETAILS_STATE, isOpenModalDetails: props.data._id})
    }

    const [{fail}, dragRef] = useDrag({
        type: "ingredient",
        item: props.data,
        collect: monitor => ({
            fail: monitor.isDragging() && haveBun && props.data.type === 'bun' ? true : false
        })
    });
    return (
        <>
            <div className={clsx(styles.product)} ref={dragRef} onClick={handleOpenClick}>
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
        </>
    )
}

Product.propTypes = {
    data: dataProp.isRequired
}

export default Product;