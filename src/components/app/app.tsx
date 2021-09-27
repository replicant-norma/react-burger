import React, {useCallback, useState} from "react";
import {useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsItems} from "../../services/actions/burger-ingredients-action";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
import {ForgotPassword, HomePage, Login, Register, ResetPassword, Profile, Ingredients, NotFound} from "../../pages";
import {ProtectedRoute} from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {UnProtectedRoute} from "../unprotected-route/unprotected-route";
import {RootState} from "../../index";
import {SET_MODAL_DETAILS_STATE} from "../../services/actions/burger-ingredients-action";
import {getCookie} from "../../utils/utils";
import {getProfile, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN} from "../../services/actions/auth-action";
import {refreshToken} from "../../utils/burger-api";
import {Location} from "history";

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


    return (
        <div className="App">
            <AppHeader/>
            <main role="main" className={styles.container}>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        <HomePage/>
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
                        <Profile/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id" exact={true}>
                        <Profile/>
                    </ProtectedRoute>
                    <Route path={"/ingredients/:id"}>
                        <IngredientDetails/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
                {background &&
                (<Route path={"/ingredients/:id"} render={() =>
                        <Modal onClose={handleCloseClick} title="Детали ингредиента">
                            <IngredientDetails/>
                        </Modal>} />
                )}

            </main>
        </div>
    );
}

export default App;
