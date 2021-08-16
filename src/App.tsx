import React from 'react';
import './App.css';
import './utils/data.js';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader />
        <h1>Соберите бургер</h1>
        <BurgerIngredients />
        <BurgerConstructor />
      </header>
    </div>
  );
}

export default App;
