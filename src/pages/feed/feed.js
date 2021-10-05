import React, {useEffect} from "react";
import styles from './feed.module.css';
import {OrderList} from "../../components/order-list/order-list";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_START} from "../../services/actions/ws-action";
import ws_data from "../../utils/data";

export const Feed = () => {

    const dispatch = useDispatch();
    const {messages, wsConnected} = useSelector((state) => state.wsReducer);

    useEffect(() => {
        if (!wsConnected) dispatch({type: WS_CONNECTION_START});
    }, [wsConnected, dispatch]);

    const done = ws_data.orders.filter((item) => item.status === 'done').slice(0, 10);
    const doing = ws_data.orders.filter((item) => item.status === 'pending').slice(0, 10);


    return (
        <div className={styles.feed}>
            <h2 className="text text_type_main-large">Лента заказов</h2>
            <div className={styles.wrapper}>
                <section className={styles.orders}>
                    <OrderList orders={ws_data.orders}/>
                </section>
                <section className={styles.stats}>
                    <div className={styles.status}>
                        <div className={styles.done}>
                            <h4 className="text text_type_main-medium">Готовы:</h4>
                            <ul className={styles.orderList}>
                                {done.map((item,index) => {
                                    return(
                                        <li className="text text_type_digits-default" key={index}>{item.number}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={styles.doing}>
                            <h4 className="text text_type_main-medium">В работе:</h4>
                            <ul className={styles.orderList}>
                                {doing.map((item,index) => {
                                    return(
                                        <li className="text text_type_digits-default" key={index}>{item.number}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.totalDone}>
                        <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
                        <p className="text text_type_digits-large">{ws_data.total}</p>
                    </div>
                    <div className={styles.totalDone}>
                        <h4 className="text text_type_main-medium">Выполнено за все сегодня:</h4>
                        <p className="text text_type_digits-large">{ws_data.totalToday}</p>
                    </div>
                </section>
            </div>
        </div>
    )
}


export default Feed;