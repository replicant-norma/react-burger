import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({children, ...rest}) => {
    const {accessToken} = useSelector((state) => state.auth);
    const history = useHistory();
    const location = useLocation();
    useEffect(()=> {
        history.push(location.pathname);
    },[]);
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