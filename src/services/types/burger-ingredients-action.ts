import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_TAB,
    SET_MODAL_DETAILS_STATE
}
    from '../actions/burger-ingredients-action';
import IDataIngredients from "../../types";

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: Array<IDataIngredients>
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetCurrentTab {
    readonly type: typeof SET_CURRENT_TAB;
    readonly currentTab: string;
}

export interface ISetModalDetailsState {
    readonly type: typeof SET_MODAL_DETAILS_STATE;
    readonly isOpenModalDetails: boolean;
}

export type TBurgerIngredientsActions =
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
    | ISetCurrentTab
    | ISetModalDetailsState
