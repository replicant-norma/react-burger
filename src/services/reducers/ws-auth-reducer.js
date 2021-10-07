import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE
} from '../actions/ws-auth-action';

const wsState = {
    wsConnected: false,
    ordersAll: null,
    error: ''
};
export const wsAuthReducer = (state = wsState, action) => {
    switch (action.type) {
        case WS_AUTH_CONNECTION_START: {
            return {...state}
        }
        case WS_AUTH_CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };

        case WS_AUTH_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_AUTH_CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };
        case WS_AUTH_GET_MESSAGE:
            return {
                ...state,
                error: null,
                ordersAll: action.payload,
            };
        default:
            return state;
    }
};