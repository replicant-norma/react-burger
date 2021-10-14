import {rootReducer} from '../reducers';
import {createStore, compose, applyMiddleware} from "redux";
import socketMiddleware from "../middleware/socketMiddleware";
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE
} from "../actions/ws-action";

import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_SEND_MESSAGE
} from '../actions/ws-auth-action';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const WS_AUTH_URL = 'wss://norma.nomoreparties.space/orders';
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk,
    socketMiddleware(`${WS_URL}`, {
        WS_CONNECTION_START,
        WS_CONNECTION_SUCCESS,
        WS_CONNECTION_ERROR,
        WS_GET_MESSAGE,
        WS_CONNECTION_CLOSED,
        WS_SEND_MESSAGE
    }, false),
    socketMiddleware(`${WS_AUTH_URL}`, {
        WS_CONNECTION_START: WS_AUTH_CONNECTION_START,
        WS_CONNECTION_SUCCESS: WS_AUTH_CONNECTION_SUCCESS,
        WS_CONNECTION_ERROR: WS_AUTH_CONNECTION_ERROR,
        WS_GET_MESSAGE: WS_AUTH_GET_MESSAGE,
        WS_CONNECTION_CLOSED: WS_AUTH_CONNECTION_CLOSED,
        WS_SEND_MESSAGE: WS_AUTH_SEND_MESSAGE
    }, true)));
export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


