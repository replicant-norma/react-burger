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

{/* Собираем хэдер */}

function AppHeader(){
    return (
        <header className={styles.header}>
            <div className={clsx(styles.item, "pl-5 pr-5 mr-2")}>
                <div className={clsx(styles.icon, "mr-2")}>
                <BurgerIcon type="primary"/>
                </div>
                <a href="#" className={clsx("text_type_main-default text_color_primary",
                    styles.link)}>Конструктор</a>
            </div>
            <div className={clsx(styles.item, "pl-5 pr-5")}>
                <div className={clsx(styles.icon, "mr-2")}>
                <ListIcon type="secondary"/>
                </div>
                <a href="#" className={clsx("text_type_main-default text_color_inactive",
                    styles.link)}>Лента заказов</a>
            </div>
               <div className={clsx(styles.logo, "ml-30")}>
                   <Logo/>
               </div>
            <div className={clsx(styles.item, "pl-5 pr-5")}>
                <div className={clsx(styles.icon, "mr-2")}>
                <ProfileIcon type="secondary"/>
                </div>
                <a href="#" className={clsx("text_type_main-default text_color_inactive",
                    styles.link)}>Личный кабинет</a>
            </div>
        </header>

        )
}

export default AppHeader;