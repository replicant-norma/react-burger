import React from 'react';
import styles from './app-header.module.css';
import clsx from 'clsx';
import {NavLink, Link} from "react-router-dom";
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
            <div className={styles.container}>
                <div className={clsx(styles.item, "pl-5 pr-5 mr-2")}>
                    <NavLink to="/" exact={true} className={clsx("text_type_main-default",
                        styles.link)} activeClassName={styles.active}>
                        <BurgerIcon type="secondary"/>
                        <span>Конструктор</span>
                    </NavLink>
                </div>
                <div className={clsx(styles.item, "pl-5 pr-5")}>
                    <NavLink to="/feed" className={clsx("text_type_main-default",
                        styles.link)} activeClassName={styles.active}>
                        <ListIcon type="secondary"/>
                        <span>Лента заказов</span>
                    </NavLink>
                </div>
                <div className={clsx(styles.logo, "ml-30")}>
                    <Link to={"/"}><Logo/></Link>
                </div>
                <div className={clsx(styles.item, "pl-5 pr-5")}>
                    <NavLink to="/profile" className={clsx("text_type_main-default",
                        styles.link)} activeClassName={styles.active}>
                        <ProfileIcon type="secondary"/>
                        <span>Личный кабинет</span>
                    </NavLink>
                </div>
            </div>
        </header>

    )
}

export default AppHeader;