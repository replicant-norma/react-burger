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
    SWAP_CONSTRUCTOR_INGREDIENT
} from '../actions/burger-constructor-action'

const initialState = {
    haveBun: false,
    orderDetails: [],
    orderNumber: null,
    ingredient: null,
    isOpenModalOrder: false,
    isLoading: false,
    hasError: false,
    draggedElement: null
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_ORDER_STATE: {
            return {...state, isOpenModalOrder: action.isOpenModalOrder}
        }
        case SET_DRAGGED_ELEMENT: {
            return {...state, draggedElement: action.index}
        }
        case HAVE_BUN: {
            return {...state, haveBun: action.haveBun}
        }
        case PUSH_ORDER_ITEM: {
            return {
                ...state, orderDetails: [...state.orderDetails, action.ingredient]
            }
        }
        case DELETE_ORDER_ITEM: {
            return {
                ...state,
                orderDetails: state.orderDetails.filter((item, index) => index !== action.index)
            }
        }
        case CHANGE_ORDER_BUN: {
            return {
                ...state,
                orderDetails:
                    [...state.orderDetails.filter((item) => item.type !== 'bun'), action.ingredient]
            }
        }
        case SWAP_CONSTRUCTOR_INGREDIENT: {
            const orderDetails = [...state.orderDetails];
            const draggedElement = orderDetails[action.draggedElement];
            orderDetails[action.draggedElement] = orderDetails[action.swapElement];
            orderDetails[action.swapElement] = draggedElement;

            return {
                ...state,
                orderDetails: orderDetails
            }
        }
        case SET_ORDER_NUMBER: {
            return {...state, orderNumber: action.orderNumber}
        }
        case GET_ORDER_REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_ORDER_SUCCESS: {
            return {...state, isLoading: false, orderNumber: action.orderNumber}
        }
        case GET_ORDER_FAILED: {
            return {...state, hasError: true, isLoading: false}
        }
        default: {
            return state
        }
    }

}