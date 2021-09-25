import React, {useContext, useEffect, useState, useMemo} from 'react';
import {Box, Typography, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import dataProp from "../../utils/data-prop";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";


{/* Блок отображения продукта из левого экрана*/
}

function Product(props) {
    const {haveBun, orderDetails} = useSelector(state => state.burgerConstructor);
    const {isOpenModalDetails} = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();

    const count = useMemo(() =>
        orderDetails.filter((item) => item._id === props.data._id).length, [orderDetails])

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenClick = () => {
        setIsOpenModal(true);
        dispatch({type: 'SET_MODAL_DETAILS_STATE', isOpenModalDetails: props.data._id})
        //if (props.data.type ===  'bun' && haveBun) return null;
        //if (props.data.type === 'bun' && !haveBun) {
        //    dispatch({type: 'HAVE_BUN', haveBun: true})
        //}
        //dispatch({type:'PUSH_ORDER_ITEM', ingredient: props.data})
        //setCount(count+1);
    }

    const handleCloseClick = () => {
        setIsOpenModal(false);
        dispatch({type: 'SET_MODAL_DETAILS_STATE', isOpenModalDetails: null})
    };
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
            {isOpenModal && (<Modal onClose={handleCloseClick} title="Детали ингредиента">
                    <IngredientDetails data={isOpenModalDetails}/>
                </Modal>
            )}
        </>
    )
}

Product.propTypes = {
    data: dataProp.isRequired
}

export default Product;