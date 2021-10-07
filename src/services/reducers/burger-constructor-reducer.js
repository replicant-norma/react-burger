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

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_ORDER_STATE: {
            return {...state, isOpenModalOrder: action.isOpenModalOrder}
        }
        case SET_MODAL_ORDER_FULL_STATE: {
            return {...state, isOpenModalOrderFull: action.isOpenModalOrderFull}
        }
        case SET_DRAGGED_ELEMENT: {
            return {...state, draggedElement: action.index}
        }
        case SET_SWAP_ELEMENT: {
            return {...state, swapElement: action.index}
        }
        case HAVE_BUN: {
            return {...state, haveBun: action.haveBun}
        }
        case PUSH_ORDER_ITEM: {
            return {
                ...state, orderDetails: [...state.orderDetails, action.ingredient]
            }
        }
        case RESET_ORDER_DETAILS: {
            return {
                ...state, orderDetails: []
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
            //const draggedElement = orderDetails[action.draggedElement];
            //orderDetails[action.draggedElement] = orderDetails[action.swapElement];
            //orderDetails[action.swapElement] = draggedElement;

            const draggedElement = orderDetails[action.draggedElement];
            orderDetails.splice(action.draggedElement, 1);
            orderDetails.splice(action.swapElement, 0, draggedElement);


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
        case GET_ORDERS_ALL_REQUEST: {
                return {...state, isLoading: true}
            }
        case GET_ORDERS_ALL_SUCCESS: {
                return {...state, isLoading: false, ordersAll: action.ordersAll}
            }
        case GET_ORDERS_ALL_FAILED: {
                return {...state, hasError: true, isLoading: false}

        }
        default: {
            return state
        }
    }

}