import {getIngredients} from "../../utils/burger-api";
import {AppDispatch, AppThunk} from "../store";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const SET_MODAL_DETAILS_STATE = 'SET_MODAL_DETAILS_STATE' as const;

export const getIngredientsItems: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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