import React from 'react';
import styles from './app-header.module.css';
import clsx from 'clsx';
import {
    Box,
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
    Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

{/* Собираем хэдер */
}

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={clsx(styles.item, "pl-5 pr-5 mr-2")}>
                <a href="#" className={clsx("text_type_main-default text_color_primary",
                    styles.link)}>
                    <BurgerIcon type="primary"/>
                    <span>Конструктор</span>
                </a>
            </div>
            <div className={clsx(styles.item, "pl-5 pr-5")}>
                <a href="#" className={clsx("text_type_main-default text_color_inactive",
                    styles.link)}>
                    <ListIcon type="secondary"/>
                    <span>Лента заказов</span>
                </a>
            </div>
            <div className={clsx(styles.logo, "ml-30")}>
                <Logo/>
            </div>
            <div className={clsx(styles.item, "pl-5 pr-5")}>
                <a href="#" className={clsx("text_type_main-default text_color_inactive",
                    styles.link)}>
                    <ProfileIcon type="secondary"/>
                    <span>Личный кабинет</span>
                </a>
            </div>
        </header>

    )
}

export default AppHeader;