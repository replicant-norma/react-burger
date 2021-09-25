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
import OrderDetails from "../order-details/order-details";
import {RootState} from "../../index";

export const App = () => {

    const {isOpenModalOrder} = useSelector((state: RootState) => state.burgerConstructor);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch])

    const history = useHistory();
    let location = useLocation<{ background: false }>();
    let background = location.state && location.state.background;

    const handleCloseClick = () => {
        history.push('/');
        dispatch({type: 'SET_MODAL_DETAILS_STATE', isOpenModalDetails: null})
    };

    const handleCloseClickOrder = () => {
        history.push('/');
        dispatch({type: 'SET_MODAL_ORDER_STATE', isOpenModalOrder: false});
        dispatch({type: 'SET_ORDER_NUMBER', orderNumber: null});
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
                (<Route path={"/ingredients/:id"}>
                        <Modal onClose={handleCloseClick} title="Детали ингредиента">
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                )}
                {isOpenModalOrder && background && (<ProtectedRoute path={"/"}>
                    <Modal onClose={handleCloseClickOrder}>
                        <OrderDetails/>
                    </Modal>
                </ProtectedRoute>)}

            </main>
        </div>
    );
}

export default App;
