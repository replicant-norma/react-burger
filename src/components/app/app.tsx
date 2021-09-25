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

export const App = () => {
    //const {isOpenModalDetails} = useSelector((state) =>state.burgerIngredients);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch])
    //const [isOpenModal, setIsOpenModal] = useState(false);

    const history = useHistory();
    let location = useLocation<{background: false}>();
    let background = location.state && location.state.background;

    const handleCloseClick = () => {
        history.push('/');
        //setIsOpenModal(false);
        dispatch({type: 'SET_MODAL_DETAILS_STATE', isOpenModalDetails: null})
    };

    return (
            <div className="App">
                <AppHeader/>
                <main role="main" className={styles.container}>
                    <Switch location={background || location}>
                        <Route path="/" exact={true}>
                            <HomePage/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login/>
                        </Route>
                        <Route path="/register" exact={true}>
                            <Register/>
                        </Route>
                        <Route path="/forgot-password" exact={true}>
                            <ForgotPassword/>
                        </Route>
                        <Route path="/reset-password" exact={true}>
                            <ResetPassword/>
                        </Route>
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
                            <IngredientDetails />
                        </Modal>
                     </Route>
                    )}
                </main>
            </div>
    );
}

export default App;
