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
        <BurgerIngredients />
        <BurgerConstructor />
      </header>
    </div>
  );
}

export default App;
