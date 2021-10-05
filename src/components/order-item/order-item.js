import React, {useEffect} from 'react';
import styles from './order-item.module.css';
import clsx from 'clsx';
import {
    Box, CurrencyIcon,
    Typography,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";

export const OrderItem = (props) => {

    const {data} = useSelector((state) => state.burgerIngredients);
    let totalPrice = 0;
    let pics = [];
    props.order.ingredients.forEach(function (orderItem) {
        let element = data.find((item) => item._id === orderItem);
        if (element) {
            pics.push({src: element.image_mobile, name: element.name});
            totalPrice += element.price;
        }
    });

    return (
        <div className={styles.order}>
            <div className={styles.header}>
                <span className="text text_type_digits-default">#{props.order.number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {props.order.createdAt}
                </span>
            </div>
            <div className={styles.name}>
                <h2 className="text text_type_main-medium">{props.order.name}</h2>
            </div>
            <div className={styles.item}>
                <div className={styles.pics}>
                    {pics.slice(0, 6).map((item, index) => {
                        const opacity = index === 5 && pics.length > 6 ? 0.6 : 1;
                        return (
                            <div className={styles.icon} key={index} style={{zIndex: index}}>
                                <img className={styles.img} src={item.src} alt={item.name}
                                     style={{opacity: opacity}}/>
                                {index === 5 && pics.length > 6 ?
                                    <div className={clsx(styles.more, "text text_type_main-default")}>
                                        +{pics.length - 6}</div> : null}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.price}>
                    <div className="mr-2 text text_type_digits-default">{totalPrice}</div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}