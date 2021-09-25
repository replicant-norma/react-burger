import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import styles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import {Box, Typography, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {BurgerConstructorContext} from "../../services/appContext";

{/* Собираем список ингредиентов */
}

function IngredientList(props) {
    const {state, setState} = useContext(BurgerConstructorContext);

    function fakeOrder() {
        const countGenerator = Math.floor(Math.random() * 12); // количество ингредиентов в бургере
        const buns = state.data.filter((item) => item.type === 'bun'); // отобрали булки
        const bun = buns[Math.floor(Math.random() * 2)]; // рандомно выбрали одну из булок
        const notBuns = state.data.filter((item) => item.type !== 'bun'); // отобрали не-булки
        let fakeIngredients = [];
        fakeIngredients.push(bun);
        for (let i = 0; i <= countGenerator; i++) {
            const randomIngredient = Math.floor(Math.random() * 12);
            fakeIngredients.push(notBuns[randomIngredient]);
        }
        setState({...state, orderDetails: fakeIngredients});
        return fakeIngredients;
    }

    useEffect(() => {
        const ingredients = async () => {
            fakeOrder()
        }
        ingredients()
    }, [state.data]);


    const pList = state.orderDetails.map(function (el, index) {
            if (el.type == 'main' || el.type == 'sauce') {
                return (
                    <div className={styles.wrapper} key={index}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={el.name}
                            price={el.price}
                            thumbnail={el.image}
                        />
                    </div>
                )
            }
        }
    );
    const burger = state.orderDetails.map(function (el, index) {
        if (el.type == 'bun') {
            return (
                <div className={styles.flex} onClick={fakeOrder} key={index}>
                    <ConstructorElement
                        type="top"
                        isLocked="true"
                        text={el.name + ' верх'}
                        price={el.price}
                        thumbnail={el.image}
                    />
                    <div className={clsx(styles.list, styles.flex)}>
                        {pList}
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked="true"
                        text={el.name + ' низ'}
                        price="0"
                        //в массиве заказа булка одна, а в конструкторе показывается 2 раза с ценой
                        //получается клиент не поймет, как формируется цена
                        //поэтому вторая половинка булки должна быть с нулевой ценой
                        thumbnail={el.image}
                    />
                </div>
            )
        }
    })
    return (
        <>
            {burger}

        </>
    )
}

/*IngredientList.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}*/

export default IngredientList;