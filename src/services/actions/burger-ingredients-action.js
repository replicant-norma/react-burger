import {getIngredients} from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const SET_MODAL_DETAILS_STATE = 'SET_MODAL_DETAILS_STATE';

export function getIngredientsItems() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients()
            .then((data) => dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                data: data.data
            }))
            .catch((e) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}

/*
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from "../initialState";
import { getIngredients} from "../../utils/burger-api";


export const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState: initialState,
    reducers:{
        loadIngredients : function (state, action){
            return void(state.data = action.payload)
        },
        isLoading : (state,action) => void(state.isLoading = action.payload),
        hasError: (state,action) => void(state.hasError = action.payload),
        doneLoad: (state,action) => void(state.doneLoad = action.payload),

    }
})

export function getItems() {
    return function (dispatch) {
        dispatch({isLoading:true});
        getIngredients()
            .then((data) => {
                dispatch({ isLoading: false});
            })
            .catch((e) => {
                dispatch({hasError: true})
            });
    }
}

//export const { loadIngredients } = burgerIngredientsSlice.actions;
//export default burgerIngredientsSlice.reducer;

 */