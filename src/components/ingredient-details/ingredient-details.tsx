import React, {FC, ReactElement} from 'react';
import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import IDataIngredients from "../../types";
import {RootState} from "../../services/store";

export const IngredientDetails: FC = ():any => {
    const {id} = useParams<{ id?: string }>();
    const {data, doneLoad} = useSelector((state: RootState) => state.burgerIngredients);
    const details: IDataIngredients|any = data.find((item: IDataIngredients) => item._id === id);

    return (doneLoad && (
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
    ))
}

export default IngredientDetails;