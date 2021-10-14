import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer} from './services/reducers';
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router} from "react-router-dom";
import socketMiddleware from "./services/middleware/socketMiddleware";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE
} from "./services/actions/ws-action";

import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_SEND_MESSAGE
} from './services/actions/ws-auth-action';

/*declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}*/

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const WS_AUTH_URL = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

///compose;
/*    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
*/
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
const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*const store = configureStore({
        reducer: rootReducer,
        middleware: [thunk],
        devTools: process.env.NODE_ENV !== 'production',
        //preloadedState,
        enhancers: [],
    })
*/
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
