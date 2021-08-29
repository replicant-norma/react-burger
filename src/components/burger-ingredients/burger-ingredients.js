import React, {useMemo} from 'react';
import {Box, Typography, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import clsx from 'clsx';
import ProductList from '../product-list/product-list';
import PropTypes from 'prop-types';
import dataProp from '../../utils/data-prop.js';

{/* Собираем левую часть конструктора */
}

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('bun');
    const bun = useMemo(() => props.data.filter((item) => item.type === 'bun'), [props.data]);
    const main = useMemo(() => props.data.filter((item) => item.type === 'main'), [props.data]);
    const sauce = useMemo(() => props.data.filter((item) => item.type === 'sauce'), [props.data]);
    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    };
    return (
        <>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <div className={clsx(styles.products, "mt-4")}>
                <ProductList listName="Булки" type="bun" data={bun}/>
                <ProductList listName="Соусы" type="sauce" data={sauce}/>
                <ProductList listName="Начинки" type="main" data={main}/>
            </div>
        </>

    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}

export default BurgerIngredients;