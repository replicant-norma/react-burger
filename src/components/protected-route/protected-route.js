import React, {useEffect} from "react";
import {getCookie} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../services/actions/auth-action";
import {Redirect, Route} from "react-router-dom";
import {refreshToken} from "../../utils/burger-api";

export const ProtectedRoute = ({children, ...rest}) =>{
    const isRefreshToken = localStorage.getItem('refreshToken');
    const {accessToken} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const init = () =>{
        if (getCookie('accessToken')){
            dispatch({type:'SET_ACCESS_TOKEN', payload: getCookie('accessToken')})
            dispatch(getProfile())
        } else{
            if(isRefreshToken) {
                refreshToken();
                dispatch(getProfile());
                dispatch({type:'SET_ACCESS_TOKEN', payload: getCookie('accessToken')})
                dispatch({type:'SET_REFRESH_TOKEN', payload: localStorage.getItem('accessToken')})
            }

        }
    }

    useEffect(()=>{
        init();
    }, [])

    return (
        <Route {...rest}
            render={({location}) =>
             accessToken ? (children) :(
                 <Redirect to={{pathname: '/login', state: { from: location }}}/>
             )
            } />
    )

}