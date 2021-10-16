import React, {useMemo, FC} from 'react';
import styles from './ingredient-list.module.css';
import WrapperConstructorElement from "../wrapper-constructor-element/wrapper-constructor-element";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import {useDrop} from "react-dnd";
import {
    CHANGE_ORDER_BUN,
    HAVE_BUN,
    PUSH_ORDER_ITEM,
} from "../../services/actions/burger-constructor-action";
import IDataIngredients from "../../types";
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";


export const IngredientList: FC =() => {
    const dispatch = useAppDispatch();
    const {orderDetails, haveBun} = useAppSelector((state: RootState) => state.burgerConstructor);
    const pList = useMemo(() => orderDetails.map(function (el:IDataIngredients, index: number) {
            if (el.type == 'main' || el.type == 'sauce') {
                return (
                    <WrapperConstructorElement key={index}
                                               index={index} data={el} />
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
            // @ts-ignore
            onDropHandler(item)
        }
    });

    const onDropHandler = (item: IDataIngredients) => {
        if (item.type === 'bun' && haveBun)
            return dispatch({type: CHANGE_ORDER_BUN, ingredient: item});
        if (item.type === 'bun' && !haveBun) {
            dispatch({type: HAVE_BUN, haveBun: true})
        }
        dispatch({type: PUSH_ORDER_ITEM, ingredient: item});
    }

    const burger = useMemo(() => orderDetails.map(function (el:IDataIngredients, index: number) {
        if (el.type == 'bun') {
            return (
                <div className={styles.flex} key={index}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={el.name + ' верх'}
                        price={el.price}
                        thumbnail={el.image}
                    />
                    <div id="constructor" className={clsx(styles.list, styles.flex)}>
                        {pList}
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
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

export default IngredientList;