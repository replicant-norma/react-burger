import React from "react";
import styles from './not-found.module.css';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import logo from '../../images/logo.svg';

export const NotFound = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <div className={styles.digits}>4</div>
                    <img src = {logo} alt = "404" />
                    <div className={styles.digits}>4</div>
                </div>
                <div className="text text_type_main-medium text_color_inactive">Упс, вы заблудились. Здесь бургеров
                    нет.
                </div>
            </div>

        </>
    );
}

export default NotFound;