import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {useSelector} from "react-redux";

function IngredientDetails(props) {
    const {data} = useSelector(state => state.burgerIngredients);
    const details = data.filter((item) => item._id === props.data);
    return (
        <div className={styles.details}>
            <div className={styles.img}>
                <img src={details[0].image_large} alt={details[0].name}/>
            </div>
            <div className={styles.name}>
                <h2 className="text text_type_main-medium">{details[0].name}</h2>
            </div>
            <div className={clsx(styles.parameters, "mt-8")}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Калории,ккал</span>
                        <span className="text text_type_digits-default">{details[0].calories}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Белки,г</span>
                        <span className="text text_type_digits-default">{details[0].proteins}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Жиры,г</span>
                        <span className="text text_type_digits-default">{details[0].fat}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Углеводы,г</span>
                        <span className="text text_type_digits-default">{details[0].carbohydrates}</span>
                    </li>
                </ul>

            </div>

        </div>

    )
}

IngredientDetails.propTypes = {
    data: PropTypes.string.isRequired
}
export default IngredientDetails;