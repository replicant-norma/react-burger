import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {getCookie} from "../../utils/utils";

export const ProtectedRoute = ({children, ...rest}) => {
    //const {accessToken} = useSelector((state) => state.auth);
    const accessToken = getCookie('accessToken');
    const history = useHistory();
    const location = useLocation();
    useEffect(()=> {
        history.push(location.pathname);
    },[history]);
    return (
        <Route {...rest}
               render={({location}) =>
                   accessToken ? (children) : (
                       <Redirect to={{pathname: '/login', state: {from: location}}}/>
                   )
               }/>
    )

}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}