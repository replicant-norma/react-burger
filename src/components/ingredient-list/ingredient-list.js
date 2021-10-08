import React, {useMemo, useRef} from 'react';
import styles from './ingredient-list.module.css';
import WrapperConstructorElement from "../wrapper-constructor-element/wrapper-constructor-element";
import {Box, Typography, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {
    CHANGE_ORDER_BUN,
    HAVE_BUN,
    PUSH_ORDER_ITEM,
} from "../../services/actions/burger-constructor-action";

{/* Собираем список ингредиентов */
}

function IngredientList(props) {
    const dispatch = useDispatch();
    const {orderDetails, haveBun, draggedElement, swapElement} = useSelector(state => state.burgerConstructor);
    const pList = useMemo(() => orderDetails.map(function (el, index) {
            if (el.type == 'main' || el.type == 'sauce') {
                return (
                    <WrapperConstructorElement key={index}
                                               index={index} data={el}/>
                )
            }
        }
    ), [orderDetails]);

    const [{opacity}, dropTarget] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            opacity: monitor.isOver() ? 0.3 : 1,
        }),
        drop(item) {
            onDropHandler(item)
        }
    });

    const onDropHandler = (item) => {
        if (item.type === 'bun' && haveBun)
            return dispatch({type: CHANGE_ORDER_BUN, ingredient: item});
        if (item.type === 'bun' && !haveBun) {
            dispatch({type: HAVE_BUN, haveBun: true})
        }
        dispatch({type: PUSH_ORDER_ITEM, ingredient: item});
    }

    const burger = useMemo(() => orderDetails.map(function (el, index) {
        if (el.type == 'bun') {
            return (
                <div className={styles.flex} id={index} key={index}>
                    <ConstructorElement
                        type="top"
                        isLocked="true"
                        text={el.name + ' верх'}
                        price={el.price}
                        thumbnail={el.image}
                    />
                    <div id="constructor" className={clsx(styles.list, styles.flex)}>
                        {pList}
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked="true"
                        text={el.name + ' низ'}
                        price={el.price}
                        thumbnail={el.image}
                    />
                </div>
            )
        }
    }), [orderDetails])
    return (
        <>
            <div className={styles.dnd} style={{opacity: opacity}} ref={dropTarget}>
                {burger}
            </div>
        </>
    )
}

/*IngredientList.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}*/

export default IngredientList;