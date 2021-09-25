import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";

function IngredientDetails() {
    const {id} = useParams();
    const {data, doneLoad} = useSelector(state => state.burgerIngredients);
    const details = data.find((item) => item._id === id);

    return (doneLoad &&
        <div className={styles.wrapper}>
            <div className={styles.details}>
                <div className={styles.img}>
                    <img src={details.image_large} alt={details.name}/>
                </div>
                <div className={styles.name}>
                    <h2 className="text text_type_main-medium">{details.name}</h2>
                </div>
                <div className={clsx(styles.parameters, "mt-8")}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <span className="text text_type_main-default">Калории,ккал</span>
                            <span className="text text_type_digits-default">{details.calories}</span>
                        </li>
                        <li className={styles.item}>
                            <span className="text text_type_main-default">Белки,г</span>
                            <span className="text text_type_digits-default">{details.proteins}</span>
                        </li>
                        <li className={styles.item}>
                            <span className="text text_type_main-default">Жиры,г</span>
                            <span className="text text_type_digits-default">{details.fat}</span>
                        </li>
                        <li className={styles.item}>
                            <span className="text text_type_main-default">Углеводы,г</span>
                            <span className="text text_type_digits-default">{details.carbohydrates}</span>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

/*IngredientDetails.propTypes = {
    data: PropTypes.string.isRequired
}*/
export default IngredientDetails;