import React from 'react';
import styles from './app-header.css';
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
        <header className="header">
            <div className="item pl-5 pr-5 mr-2">
                <div className="icon mr-2">
                <BurgerIcon type="primary"/>
                </div>
                <a href="#" className="text_type_main-default text_color_primary item_link">Конструктор</a>
            </div>
            <div className="item pl-5 pr-5">
                <div className="icon mr-2">
                <ListIcon type="secondary"/>
                </div>
                <a href="#" className="text_type_main-default text_color_inactive item_link">Лента заказов</a>
            </div>
               <div className="logo ml-30">
                   <Logo/>
               </div>
            <div className="item pl-5 pr-5">
                <div className="icon mr-2">
                <ProfileIcon type="secondary"/>
                </div>
                <a href="#" className="text_type_main-default text_color_inactive item_link">Личный кабинет</a>
            </div>
        </header>

        )
}

export default AppHeader;