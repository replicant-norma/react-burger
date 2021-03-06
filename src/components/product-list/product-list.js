import React from 'react';
import styles from './product-list.module.css';
import Product from "../product/product";
import clsx from 'clsx';
import {useMemo} from "react";
import {Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";

{/* Компонент для отображения списка продуктов из левого экрана */
}

function ProductList(props) {
    const pList = props.data.map(function (el, index) {
        return (
            <Product key={el._id} data={el}/>
        )
    });
    return (
        <div id={props.type} className={styles.position}>
            <h3 className="text text_type_main-medium mb-6">{props.listName}</h3>
            <div className={clsx(styles.list, " pl-4 mb-10")}>
                {pList}
            </div>
        </div>
    )
}

ProductList.propTypes = {
    data: PropTypes.arrayOf(dataProp.isRequired).isRequired
}
export default ProductList;