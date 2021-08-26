import React from 'react';
import styles from './product-list.module.css';
import Product from "../product/product";
import clsx from 'clsx';
import { Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";

{/* Компонент для отображения списка продуктов из левого экрана */}

function ProductList(props){
    const pList = props.data.map(function(el, index){
        if (el.type == props.type){
            return(
            <Product key={el._id} {...el} count={Math.floor(Math.random()*3)}
            />)
        }
    });
    return(
        <div className={styles.position}>
            <h3 className="text text_type_main-medium mb-6">{props.listName}</h3>
            <div className={clsx(styles.list, " pl-4 mb-10")}>

                {pList}

            </div>
        </div>
    )
}
ProductList.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}
export default ProductList;