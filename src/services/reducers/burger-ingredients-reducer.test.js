import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_TAB,
    SET_MODAL_DETAILS_STATE,
} from '../actions/burger-ingredients-action'
import {burgerIngredientsReducer} from "./burger-ingredients-reducer";

const initialState = {
    isLoading: false,
    doneLoad: false,
    hasError: false,
    data: [],
    currentTab: 'bun',
    isOpenModalDetails: null,
}

describe('burgerIngredientsReducer', () => {
    it('Test the initial state', () => {
        expect(burgerIngredientsReducer(initialState, {})).toEqual(
            {
                isLoading: false,
                doneLoad: false,
                hasError: false,
                data: [],
                currentTab: 'bun',
                isOpenModalDetails: null,
            }
        )
    })
    it('Test GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST}))
            .toEqual({...initialState, isLoading: true})
    })
    it('Test GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            data: {id: 1, type: "bun", price: 300}
        }))
            .toEqual({...initialState, isLoading: false, data: {id: 1, type: "bun", price: 300}, doneLoad: true})
    })
    it('Test GET_INGREDIENTS_FAILED', () => {
        expect(burgerIngredientsReducer(initialState, {type: GET_INGREDIENTS_FAILED}))
            .toEqual({...initialState, hasError: true, isLoading: false})
    })
    it('Test SET_CURRENT_TAB', () => {
        expect(burgerIngredientsReducer(initialState, {type: SET_CURRENT_TAB, currentTab: "bun"}))
            .toEqual({...initialState, currentTab: "bun"})
    })
    it('Test SET_MODAL_DETAILS_STATE', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: SET_MODAL_DETAILS_STATE,
            isOpenModalDetails: true
        }))
            .toEqual({...initialState, isOpenModalDetails: true})
    })
})