import React from 'react';
import {useState, useEffect} from "react";
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import config from './config/config.js';


function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });
    useEffect(() => {
        const ingredients = async () =>{
            setState({ ...state, hasError: false, isLoading: true });
                fetch(config.url + '/api/ingredients')
                    .then((res) => {
                        if (!res.ok){
                            setState({ ...state, hasError: true, isLoading: false });
                            throw new Error("Server Error");
                        }
                        return res.json()
                    })
                    .then((data) => {
                        if(data.data.length === 0){
                            setState({ ...state, hasError: true, isLoading: false });
                            throw new Error("Empty Response");
                        }
                        setState({...state, data: data.data, isLoading: false});
                    })
                    .catch((e) => {
                     console.log(e);
                    });
        }
        ingredients();
    }, []);

  return (

        <div className="App">
            <AppHeader />
            <main role="main" className={styles.container}>
            <section className={styles.burger_ingredients}>
                <BurgerIngredients data={state.data} />
            </section>
            <section className={styles.burger_constructor}>
                {/* Для теста верстки передаем весь массив сразу, но это неверно
                */}
            <BurgerConstructor data={state.data} />
            </section>
          </main>
        </div>
  );
}

export default App;
