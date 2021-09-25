import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients-reducer';
import {burgerConstructorReducer} from "./burger-constructor-reducer";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
});



/*import { combineReducers } from 'redux';
import { burgerIngredientsSlice } from '../actions/BurgerIngredients'

export const rootReducer = combineReducers({
    burgerIngredientSlice: burgerIngredientsSlice.reducer,
})*/
