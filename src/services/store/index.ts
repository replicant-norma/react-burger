import {rootReducer} from '../reducers';
import {createStore, compose, applyMiddleware} from "redux";
import socketMiddleware from "../middleware/socketMiddleware";
import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';
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
import {TAuthActions} from "../types/auth-action";
import {TBurgerConstructorActions} from "../types/burger-constructor-action";
import {TBurgerIngredientsActions} from "../types/burger-ingredients-action";
import {TForgotPasswordActions} from "../types/forgot-password-action";
import {TResetPasswordActions} from "../types/reset-password-action";
import {TWsActions} from "../types/ws-action";
import {TWsAuthActions} from "../types/ws-auth-action";

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
type TApplicationActions =
    | TAuthActions
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TForgotPasswordActions
    | TResetPasswordActions
    | TWsActions
    | TWsAuthActions

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;



