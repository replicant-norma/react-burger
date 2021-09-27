import React, {useEffect} from "react";
import {getCookie} from "../../utils/utils";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

export const UnProtectedRoute = ({children, ...rest}) => {
    const isRefreshToken = localStorage.getItem('refreshToken');
    const accessToken = getCookie('accessToken');

    return (
        <Route {...rest}
               render={({location}) =>
                   !accessToken && !isRefreshToken ? (children) : (
                       <Redirect to={{pathname: '/', state: {from: location}}}/>
                   )
               }/>
    )

}

UnProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}