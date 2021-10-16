import React, {FC} from "react";
import {getCookie} from "../../utils/utils";
import {Redirect, Route} from "react-router-dom";

export const UnProtectedRoute : FC<any> = ({children, ...rest}) => {
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