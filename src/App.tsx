import React from 'react';
import './App.css';
import data from './utils/data.js';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader />
      </header>
        <main role="main" className="container">
            <section className="burger-constructor">
                <BurgerConstructor data={data} />
            </section>
            <section className="burger-ingredients">
                {/* Для теста верстки передаем весь массив сразу, но это неверно */}
                <BurgerIngredients data={data} />
            </section>
        </main>
    </div>
  );
}

export default App;
