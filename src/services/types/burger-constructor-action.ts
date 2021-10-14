import {
    SET_MODAL_ORDER_STATE,
    SET_MODAL_ORDER_FULL_STATE,
    HAVE_BUN,
    PUSH_ORDER_ITEM,
    SET_ORDER_NUMBER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDERS_ALL_REQUEST,
    GET_ORDERS_ALL_SUCCESS,
    GET_ORDERS_ALL_FAILED,
    CHANGE_ORDER_BUN,
    SET_DRAGGED_ELEMENT,
    SET_SWAP_ELEMENT,
    SWAP_CONSTRUCTOR_INGREDIENT,
    RESET_ORDER_DETAILS,
    DELETE_ORDER_ITEM
} from '../actions/burger-constructor-action';


export interface ISetModalOrderState {
    readonly type: typeof SET_MODAL_ORDER_STATE;
    readonly isOpenModalOrder: boolean;
}

export interface ISetModalOrderFullState {
    readonly type: typeof SET_MODAL_ORDER_FULL_STATE;
    readonly isOpenModalOrderFull: boolean;
}

export interface IHaveBun {
    readonly type: typeof HAVE_BUN;
    readonly haveBun: boolean;
}

export interface IPushOrderItem {
    readonly type: typeof PUSH_ORDER_ITEM;
    readonly ingredient: string;
}

export interface ISetOrderNumber {
    readonly type: typeof SET_ORDER_NUMBER;
    readonly orderNumber: number;
}

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly orderNumber: number;
}

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrdersAllRequest {
    readonly type: typeof GET_ORDERS_ALL_REQUEST;
}

export interface IGetOrdersAllSuccess {
    readonly type: typeof GET_ORDERS_ALL_SUCCESS;
    readonly ordersAll: Array<any>|null;
}

export interface IGetOrdersAllFailed {
    readonly type: typeof GET_ORDERS_ALL_FAILED;
}

export interface IChangeOrderBun {
    readonly type: typeof CHANGE_ORDER_BUN;
    readonly ingredient: string;
}

export interface ISetDraggedElement {
    readonly type: typeof SET_DRAGGED_ELEMENT;
    readonly index: number;
}

export interface ISetSwapElement {
    readonly type: typeof SET_SWAP_ELEMENT;
    readonly index: number;
}

export interface ISwapConstructorIngredient {
    readonly type: typeof SWAP_CONSTRUCTOR_INGREDIENT;
    readonly draggedElement: number;
    readonly swapElement: number;
}

export interface IResetOrdersDetails {
    readonly type: typeof RESET_ORDER_DETAILS;
}

export interface IDeleteOrderItem {
    readonly type: typeof DELETE_ORDER_ITEM;
    readonly index: number;
}

export type TBurgerConstructorActions =
    | ISetModalOrderState
    | ISetModalOrderFullState
    | IHaveBun
    | IPushOrderItem
    | ISetOrderNumber
    | IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderFailed
    | IGetOrdersAllRequest
    | IGetOrdersAllSuccess
    | IGetOrdersAllFailed
    | IChangeOrderBun
    | ISetDraggedElement
    | ISetSwapElement
    | ISwapConstructorIngredient
    | IResetOrdersDetails
    | IDeleteOrderItem