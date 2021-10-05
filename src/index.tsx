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
import {getCookie} from "./utils/utils";


/*declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}*/

const accessToken = getCookie('accessToken');
const WS_URL = 'wss://norma.nomoreparties.space/api/orders/all';
const WS_AUTH_URL = 'wss://norma.nomoreparties.space/api/orders?token='+accessToken;


const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

///compose;
/*    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
*/
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_AUTH_URL)));
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
