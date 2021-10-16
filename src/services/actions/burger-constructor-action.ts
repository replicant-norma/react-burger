import {getOrder, getOrdersAll} from "../../utils/burger-api";
import {AppDispatch} from "../store";
export const SET_MODAL_ORDER_STATE = 'SET_MODAL_ORDER_STATE' as const;
export const SET_MODAL_ORDER_FULL_STATE = 'SET_MODAL_ORDER_FULL_STATE' as const;
export const HAVE_BUN = 'HAVE_BUN' as const;
export const PUSH_ORDER_ITEM = 'PUSH_ORDER_ITEM' as const;
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM' as const;
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER' as const;
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST' as const;
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS' as const;
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED' as const;
export const GET_ORDERS_ALL_REQUEST = 'GET_ORDERS_ALL_REQUEST' as const;
export const GET_ORDERS_ALL_SUCCESS = 'GET_ORDERS_ALL_SUCCESS' as const;
export const GET_ORDERS_ALL_FAILED = 'GET_ORDERS_ALL_FAILED' as const;
export const CHANGE_ORDER_BUN = 'CHANGE_ORDER_BUN' as const;
export const SET_DRAGGED_ELEMENT = 'SET_DRAGGED_ELEMENT' as const;
export const SET_SWAP_ELEMENT = 'SET_SWAP_ELEMENT' as const;
export const SWAP_CONSTRUCTOR_INGREDIENT = 'SWAP_CONSTRUCTOR_INGREDIENT' as const;
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS' as const;

export function orderRequest(orderDetails:{}) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrder(orderDetails)
            .then((data) =>
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderNumber: data.order.number
                }))
            .catch((e) => {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            })
    }
}

export function ordersAllRequest() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDERS_ALL_REQUEST
        });
        getOrdersAll()
            .then((data) =>
                dispatch({
                    type: GET_ORDERS_ALL_SUCCESS,
                    ordersAll: data,
                }))
            .catch((e) => {
                dispatch({
                    type: GET_ORDERS_ALL_FAILED
                })
            })
    }
}
