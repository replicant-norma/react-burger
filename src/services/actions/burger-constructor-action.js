import {getOrder} from "../../utils/burger-api";

export const SET_MODAL_ORDER_STATE = 'SET_MODAL_ORDER_STATE';
export const HAVE_BUN = 'HAVE_BUN';
export const PUSH_ORDER_ITEM = 'PUSH_ORDER_ITEM';
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CHANGE_ORDER_BUN = 'CHANGE_ORDER_BUN';
export const SET_DRAGGED_ELEMENT = 'SET_DRAGGED_ELEMENT';
export const SET_SWAP_ELEMENT = 'SET_SWAP_ELEMENT';
export const SWAP_CONSTRUCTOR_INGREDIENT = 'SWAP_CONSTRUCTOR_INGREDIENT';

export function orderRequest(orderDetails) {
    return function (dispatch) {
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
