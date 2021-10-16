import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws-action';
import {IOrdersAll} from "../../types";

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly error: string;
    readonly wsConnected: boolean;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string|null;
    readonly wsConnected: boolean;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly error: string;
    readonly payload: IOrdersAll
}

export type TWsActions =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage