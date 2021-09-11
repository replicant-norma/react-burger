import React from 'react';
import {useState, useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import {getIngredients} from '../../utils/burger-api';
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsItems} from "../../services/actions/burger-ingredients-action";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = () => {
    /*const dispatch = useDispatch();
    useEffect(() => {
        const ingredients = () => {
            dispatch(actions.isLoading(true));
            getIngredients()
                .then((data) => {
                    dispatch(actions.loadIngredients(data.data));
                })
                .then(() =>{
                    dispatch(actions.isLoading(false));
                    dispatch(actions.doneLoad(true));
                })
                .catch((e) => {
                    dispatch(actions.hasError(true))
         });
        }
        ingredients();
    }, []);*/
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch])
    return (
        <div className="App">
            <AppHeader/>
            <main role="main" className={styles.container}>
                <DndProvider backend={HTML5Backend}>
                <section className={styles.burger_ingredients}>
                     <BurgerIngredients />
                </section>
                <section className={styles.burger_constructor}>
                    {/* Для теста верстки передаем весь массив сразу, но это неверно
                */}
                    <BurgerConstructor/>
                </section>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
