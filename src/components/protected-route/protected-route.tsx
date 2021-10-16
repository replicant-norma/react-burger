import React, {useEffect, FC, ReactNode} from "react";
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/utils";

export const ProtectedRoute: FC<any> = ({children, ...rest}) => {
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