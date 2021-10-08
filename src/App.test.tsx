import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './components/app/app';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import {rootReducer} from './services/reducers';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    );
    const linkElement = screen.getByText(/Соберите бургер/i);
    expect(linkElement).toBeInTheDocument();
});
