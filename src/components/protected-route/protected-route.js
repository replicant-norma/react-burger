import React, {useEffect} from "react";
import {getCookie} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN} from "../../services/actions/auth-action";
import {Redirect, Route} from "react-router-dom";
import {refreshToken} from "../../utils/burger-api";
import PropTypes from "prop-types";

export const ProtectedRoute = ({children, ...rest}) => {
    const {accessToken} = useSelector((state) => state.auth)

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