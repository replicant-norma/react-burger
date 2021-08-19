import React from 'react';
import { Box, Typography, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import clsx from 'clsx';
import ProductList from '../product-list/product-list';
import PropTypes from 'prop-types';

{/* Собираем левую часть конструктора */}

function BurgerConstructor(props){
    const [current, setCurrent] = React.useState('Булки')
    return (
        <>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={clsx(styles.products, "mt-4")}>
                <ProductList listName="Булки" type="bun" data={props.data} />
                <ProductList listName="Соусы" type="sauce" data={props.data} />
                <ProductList listName="Начинки" type="main" data={props.data} />

            </div>

        </>

    )
}

const dataProp = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

BurgerConstructor.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}



export default BurgerConstructor;