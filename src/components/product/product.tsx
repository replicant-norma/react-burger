import React, {FC, useMemo} from 'react';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './product.module.css';
import clsx from 'clsx';
import {useDrag} from "react-dnd";
import {useHistory, useLocation} from "react-router-dom";
import {SET_MODAL_DETAILS_STATE} from "../../services/actions/burger-ingredients-action";
import IDataIngredients from "../../types";
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

interface IProduct {
    data: IDataIngredients
}

export const Product: FC<IProduct> = ({data}) => {
    const {haveBun, orderDetails} = useAppSelector((state: RootState) => state.burgerConstructor);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();
    const count = useMemo(() =>
        orderDetails.filter((item: IDataIngredients) => item._id === data._id).length, [orderDetails])


    const handleOpenClick = () => {
        history.push('/ingredients/' + data._id, {background: location});
        dispatch({type: SET_MODAL_DETAILS_STATE, isOpenModalDetails: true})
    }

    const [{fail}, dragRef] = useDrag({
        type: "ingredient",
        item: data,
        collect: monitor => ({
            fail: monitor.isDragging() && haveBun && data.type === 'bun' ? true : false
        })
    });
    return (
        <>
            <div className={clsx(styles.product)} ref={dragRef} onClick={handleOpenClick}>
                {count > 0 ? <Counter count={data.type === 'bun' ? 2 * count : count} size="default"/> : null}
                <div className={styles.img}>
                    <img src={data.image} alt={data.name}/>
                </div>
                <div className={clsx(styles.price, "mt-1 mb-1")}>
                    <span className="text_type_digits-default mr-1">{data.price}</span>
                    <span className="mt-1"><CurrencyIcon type="primary"/></span>
                </div>
                <div className={styles.name}>
                    <h3 className="text text_type_main-default">{data.name}</h3>
                </div>
            </div>
        </>
    )
}

export default Product;