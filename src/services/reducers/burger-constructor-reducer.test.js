import {
    PUSH_ORDER_ITEM,
    HAVE_BUN,
    SET_MODAL_ORDER_STATE,
    DELETE_ORDER_ITEM,
    SET_ORDER_NUMBER,
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    CHANGE_ORDER_BUN,
    SET_DRAGGED_ELEMENT,
    SET_SWAP_ELEMENT,
    SWAP_CONSTRUCTOR_INGREDIENT,
    RESET_ORDER_DETAILS,
    SET_MODAL_ORDER_FULL_STATE,
    GET_ORDERS_ALL_REQUEST,
    GET_ORDERS_ALL_FAILED,
    GET_ORDERS_ALL_SUCCESS

} from '../actions/burger-constructor-action'

const initialState = {
    haveBun: false,
    orderDetails: [],
    orderNumber: null,
    ingredient: null,
    isOpenModalOrder: false,
    isOpenModalOrderFull: false,
    isLoading: false,
    hasError: false,
    draggedElement: null,
    swapElement: null,
    ordersAll: null,
}

import {burgerConstructorReducer} from "./burger-constructor-reducer";

describe('burgerConstructorReducer', () => {
    it('Test the initial state', () => {
        expect(burgerConstructorReducer(initialState, {})).toEqual(
            {
                haveBun: false,
                orderDetails: [],
                orderNumber: null,
                ingredient: null,
                isOpenModalOrder: false,
                isOpenModalOrderFull: false,
                isLoading: false,
                hasError: false,
                draggedElement: null,
                swapElement: null,
                ordersAll: null,
            }
        )
    })
    it('Test PUSH_ORDER_ITEM', () => {
        expect(burgerConstructorReducer(initialState, {type: PUSH_ORDER_ITEM, ingredient: '29301'}))
            .toEqual({...initialState, orderDetails: [...initialState.orderDetails, '29301']})
    })
    it('Test HAVE_BUN', () => {
        expect(burgerConstructorReducer(initialState, {type: HAVE_BUN, haveBun: true}))
            .toEqual({...initialState, haveBun: true})
    })
    it('Test SET_MODAL_ORDER_STATE', () => {
        expect(burgerConstructorReducer(initialState, {type: SET_MODAL_ORDER_STATE, isOpenModalOrder: true}))
            .toEqual({...initialState, isOpenModalOrder: true})
    })
    it('Test DELETE_ORDER_ITEM', () => {
        expect(burgerConstructorReducer(initialState, {type: DELETE_ORDER_ITEM, index: 1}))
            .toEqual({
                ...initialState,
                orderDetails: initialState.orderDetails.filter((item, index) => index !== 1)
            })
    })

    it('Test SET_ORDER_NUMBER', () => {
        expect(burgerConstructorReducer(initialState, {type: SET_ORDER_NUMBER, orderNumber: 4152}))
            .toEqual({...initialState, orderNumber: 4152})
    })

    it('Test GET_ORDER_FAILED', () => {
        expect(burgerConstructorReducer(initialState, {type: GET_ORDER_FAILED, hasError: true, isLoading: false}))
            .toEqual({...initialState, hasError: true, isLoading: false})
    })

    it('Test GET_ORDER_REQUEST', () => {
        expect(burgerConstructorReducer(initialState, {type: GET_ORDER_REQUEST}))
            .toEqual({...initialState, isLoading: true})
    })
    it('Test GET_ORDER_SUCCESS', () => {
        expect(burgerConstructorReducer(initialState, {type: GET_ORDER_SUCCESS, orderNumber: 2531}))
            .toEqual({...initialState, isLoading: false, orderNumber: 2531})
    })

    it('Test CHANGE_ORDER_BUN', () => {
        expect(burgerConstructorReducer(initialState, {type: CHANGE_ORDER_BUN, ingredient: '6eyw72919gdfs'}))
            .toEqual({
                ...initialState,
                orderDetails: [...initialState.orderDetails.filter((item) => item.type !== 'bun'),
                    '6eyw72919gdfs']
            })
    })

    it('Test SET_DRAGGED_ELEMENT', () => {
        expect(burgerConstructorReducer(initialState, {type: SET_DRAGGED_ELEMENT, index: 5}))
            .toEqual({...initialState, draggedElement: 5})
    })

    it('Test SET_SWAP_ELEMENT', () => {
        expect(burgerConstructorReducer(initialState, {type: SET_SWAP_ELEMENT, index: 5}))
            .toEqual({...initialState, swapElement: 5})
    })

    it('Test SWAP_CONSTRUCTOR_INGREDIENT', () => {
        expect(burgerConstructorReducer({
                ...initialState,
                orderDetails: [
                    {id: 1, name: "Булка"}, {id: 2, name: "Мясо молюсков"}, {id: 3, name: "Coус"}
                ]
            },
            {type: SWAP_CONSTRUCTOR_INGREDIENT, draggedElement: 1, swapElement: 2}))
            .toEqual({
                ...initialState, orderDetails: [
                    {id: 1, name: "Булка"}, {id: 3, name: "Coус"}, {id: 2, name: "Мясо молюсков"}
                ]
            })
    })

    it('Test RESET_ORDER_DETAILS', () => {
        expect(burgerConstructorReducer(initialState,
            {type: RESET_ORDER_DETAILS, orderDetails: []}))
            .toEqual({...initialState, orderDetails: []})
    })

    it('Test SET_MODAL_ORDER_FULL_STATE', () => {
        expect(burgerConstructorReducer(initialState,
            {type: SET_MODAL_ORDER_FULL_STATE, isOpenModalOrderFull: true}))
            .toEqual({...initialState, isOpenModalOrderFull: true})
    })

    it('Test GET_ORDERS_ALL_REQUEST', () => {
        expect(burgerConstructorReducer(initialState,
            {type: GET_ORDERS_ALL_REQUEST}))
            .toEqual({...initialState, isLoading: true})
    })

    it('Test GET_ORDERS_ALL_FAILED', () => {
        expect(burgerConstructorReducer(initialState,
            {type: GET_ORDERS_ALL_FAILED}))
            .toEqual({...initialState, hasError: true, isLoading: false})
    })

    it('Test GET_ORDERS_ALL_SUCCESS', () => {
        expect(burgerConstructorReducer(initialState,
            {type: GET_ORDERS_ALL_SUCCESS, ordersAll: {id: 1, order: [1, 3, 2]}}))
            .toEqual({...initialState, isLoading: false, ordersAll: {id: 1, order: [1, 3, 2]}})
    })

})