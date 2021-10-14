import React, {useCallback, useState} from "react";
import {useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsItems} from "../../services/actions/burger-ingredients-action";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
import {
    ForgotPassword, HomePage, Login, Register, ResetPassword, Profile, NotFound, Feed, Orders
}
    from "../../pages";
import {ProtectedRoute} from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {UnProtectedRoute} from "../unprotected-route/unprotected-route";
import {SET_MODAL_DETAILS_STATE} from "../../services/actions/burger-ingredients-action";
import {ordersAllRequest, SET_MODAL_ORDER_FULL_STATE} from "../../services/actions/burger-constructor-action";
import {getCookie} from "../../utils/utils";
import {getProfile, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN} from "../../services/actions/auth-action";
import {getOrdersAll, refreshToken} from "../../utils/burger-api";
import {Location} from "history";
import OrderFullDetails from "../order-full-details/order-full-details";

export const App = () => {

    const isRefreshToken = localStorage.getItem('refreshToken');
    const dispatch = useDispatch();
    const init = () => {
        if (getCookie('accessToken')) {
            dispatch({type: SET_ACCESS_TOKEN, payload: getCookie('accessToken')})
            dispatch(getProfile())
        } else {
            if (isRefreshToken) {
                refreshToken();
                dispatch(getProfile());
                dispatch({type: SET_ACCESS_TOKEN, payload: getCookie('accessToken')})
                dispatch({type: SET_REFRESH_TOKEN, payload: localStorage.getItem('refreshToken')})
            }

        }
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        dispatch(getIngredientsItems());
        dispatch(ordersAllRequest());
    }, [dispatch])
    const history = useHistory();
    let location = useLocation<{ background?: Location<{} | null | undefined> }>();
    let background = location.state && location.state.background;

    if (history.action !== 'PUSH') {
        background = undefined
    }

    const handleCloseClick = () => {
        history.push('/');
        dispatch({type: SET_MODAL_DETAILS_STATE, isOpenModalDetails: null})
    };

    const handleCloseClickOrderFull = () => {
        history.goBack();
        dispatch({type: SET_MODAL_ORDER_FULL_STATE, isOpenModalOrderFull: false});
    };


    return (
        <div className="App">
            <AppHeader/>
            <main role="main" className={styles.container}>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        <HomePage/>
                    </Route>
                    <Route path="/feed" exact={true}>
                        <Feed/>
                    </Route>
                    <UnProtectedRoute path="/login" exact={true}>
                        <Login/>
                    </UnProtectedRoute>
                    <UnProtectedRoute path="/register" exact={true}>
                        <Register/>
                    </UnProtectedRoute>
                    <UnProtectedRoute path="/forgot-password" exact={true}>
                        <ForgotPassword/>
                    </UnProtectedRoute>
                    <UnProtectedRoute path="/reset-password" exact={true}>
                        <ResetPassword/>
                    </UnProtectedRoute>
                    <ProtectedRoute path="/profile" exact={true}>
                        <Profile/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <Orders/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id" exact={true}>
                        <OrderFullDetails/>
                    </ProtectedRoute>
                    <Route path={"/ingredients/:id"} exact={true}>
                        <IngredientDetails/>
                    </Route>
                    <Route path={"/feed/:id"} exact={true}>
                        <OrderFullDetails/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
                {background &&
                (<Switch>
                        <Route path={"/ingredients/:id"} exact={true} render={() =>
                            <Modal onClose={handleCloseClick} title="Детали ингредиента">
                                <IngredientDetails/>
                            </Modal>}/>
                        <Route path={"/feed/:id"} exact={true} render={() =>
                            <Modal onClose={handleCloseClickOrderFull}>
                                <OrderFullDetails/>
                            </Modal>
                        }/>
                        <Route path={"/profile/orders/:id"} exact={true} render={() =>
                            <Modal onClose={handleCloseClickOrderFull}>
                                <OrderFullDetails/>
                            </Modal>
                        }/>
                    </Switch>
                )}

            </main>
        </div>
    );
}

export default App;
