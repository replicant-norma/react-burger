import React from 'react';
import styles from './App.module.css';
import data from './utils/data.js';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
        <AppHeader />
        <main role="main" className={styles.container}>
            <section className={styles.burger_ingredients}>
                <BurgerIngredients data={data} />
            </section>
            <section className={styles.burger_constructor}>
                {/* Для теста верстки передаем весь массив сразу, но это неверно
                */}
                <BurgerConstructor data={data} />
            </section>
        </main>
    </div>
  );
}

export default App;
