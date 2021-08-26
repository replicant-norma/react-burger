import React, {useEffect, useState} from 'react';
import { Box, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";

function IngredientDetails(props){
    return(
        <div className={styles.details}>
            <div className={styles.img}>
                <img src={props.image_large} alt={props.name} />
            </div>
            <div className={styles.name}>
                <h2 className="text text_type_main-medium">{props.name}</h2>
            </div>
            <div className={clsx(styles.parameters, "mt-8")}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Калории,ккал</span>
                        <span className="text text_type_digits-default">{props.calories}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Белки,г</span>
                        <span className="text text_type_digits-default">{props.proteins}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Жиры,г</span>
                        <span className="text text_type_digits-default">{props.fat}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default">Углеводы,г</span>
                        <span className="text text_type_digits-default">{props.carbohydrates}</span>
                    </li>
                </ul>

            </div>

        </div>

    )
}
IngredientDetails.propTypes ={
    data: PropTypes.arrayOf(dataProp.isRequired)
}
export default IngredientDetails;