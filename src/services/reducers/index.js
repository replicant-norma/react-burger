import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients-reducer';
import {burgerConstructorReducer} from "./burger-constructor-reducer";
import {forgotPasswordReducer} from "./forgot-password-reducer";
import {resetPasswordReducer} from "./reset-password-reducer";
import {authReducer} from "./auth-reducer";
import {wsReducer} from "./ws-reducer";
import {wsAuthReducer} from "./ws-auth-reducer";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    auth: authReducer,
    wsReducer: wsReducer,
    wsAuthReducer: wsAuthReducer,
});


/*import { combineReducers } from 'redux';
import { burgerIngredientsSlice } from '../actions/BurgerIngredients'

export const rootReducer = combineReducers({
    burgerIngredientSlice: burgerIngredientsSlice.reducer,
})*/
