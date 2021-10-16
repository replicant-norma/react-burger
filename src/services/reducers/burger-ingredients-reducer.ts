import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_TAB,
    SET_MODAL_DETAILS_STATE,
} from '../actions/burger-ingredients-action'
import {TBurgerIngredientsActions} from "../types/burger-ingredients-action";
import IDataIngredients from "../../types";

type TBurgerIngredientsState ={
    isLoading: boolean;
    doneLoad: boolean;
    hasError: boolean;
    data: Array<IDataIngredients>;
    currentTab: string;
    isOpenModalDetails: boolean|null;
}

const initialState:TBurgerIngredientsState  = {
    isLoading: false,
    doneLoad: false,
    hasError: false,
    data: [],
    currentTab: 'bun',
    isOpenModalDetails: null,
}


export const burgerIngredientsReducer = (state = initialState, action:TBurgerIngredientsActions):TBurgerIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, isLoading: false, data: action.data, doneLoad: true}
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, hasError: true, isLoading: false}
        }
        case SET_CURRENT_TAB: {
            return {...state, currentTab: action.currentTab}
        }
        case SET_MODAL_DETAILS_STATE: {
            return {...state, isOpenModalDetails: action.isOpenModalDetails}
        }
        default: {
            return state
        }
    }
}