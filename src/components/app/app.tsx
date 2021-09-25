import React from 'react';
import {useState, useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import {getIngredients} from '../../utils/burger-api';
import {BurgerConstructorContext} from "../../services/appContext";


function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: [],
        haveBun: false,
        orderDetails: [],
        orderNumber: null
    });

    useEffect(() => {
        const ingredients = () => {
            setState({...state, hasError: false, isLoading: true});
            getIngredients()
                .then((data) => setState({...state, data: data.data, isLoading: false}))
                .catch((e) => {
                    setState({...state, hasError: true, isLoading: false});
                });
        }
        ingredients();
    }, []);

    return (

        <div className="App">
            <AppHeader/>
            <main role="main" className={styles.container}>
                <section className={styles.burger_ingredients}>
                    <BurgerIngredients data={state.data}/>
                </section>
                <section className={styles.burger_constructor}>
                    {/* Для теста верстки передаем весь массив сразу, но это неверно
                */}
                    <BurgerConstructorContext.Provider value={{state, setState}}>
                        <BurgerConstructor/>
                    </BurgerConstructorContext.Provider>
                </section>
            </main>
        </div>
    );
}

export default App;
