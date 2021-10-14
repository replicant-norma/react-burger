import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE
} from '../actions/ws-auth-action';
import {IOrdersAll} from "../../types";

export interface IWsAuthConnectionStart {
    readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsAuthConnectionSuccess {
    readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
    readonly error: string;
    readonly wsConnected: boolean;
}

export interface IWsAuthConnectionError {
    readonly type: typeof WS_AUTH_CONNECTION_ERROR;
    readonly payload: string|null;
    readonly wsConnected: boolean;
}

export interface IWsAuthConnectionClosed {
    readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
    readonly error: string;
    readonly wsConnected: boolean;
}

export interface IWsAuthGetMessage {
    readonly type: typeof WS_AUTH_GET_MESSAGE;
    readonly error: string;
    readonly payload: IOrdersAll
}

export type TWsAuthActions =
    | IWsAuthConnectionStart
    | IWsAuthConnectionSuccess
    | IWsAuthConnectionError
    | IWsAuthConnectionClosed
    | IWsAuthGetMessage