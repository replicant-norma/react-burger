import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws-action';

const wsState = {
    wsConnected: false,
    messages: null,
    error: ''
};
export const wsReducer = (state = wsState, action) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {...state}
        }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: null,
                messages: action.payload,
            };
        default:
            return state;
    }
};