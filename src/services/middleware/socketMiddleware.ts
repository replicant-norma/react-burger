import {getCookie} from "../../utils/utils";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../actions/ws-action';

import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_SEND_MESSAGE
} from '../actions/ws-auth-action';

type TSocketActions = {
    WS_CONNECTION_START: typeof WS_CONNECTION_START | typeof WS_AUTH_CONNECTION_START;
    WS_CONNECTION_SUCCESS: typeof WS_CONNECTION_SUCCESS | typeof WS_AUTH_CONNECTION_SUCCESS;
    WS_CONNECTION_CLOSED: typeof WS_CONNECTION_CLOSED | typeof WS_AUTH_CONNECTION_CLOSED;
    WS_CONNECTION_ERROR: typeof WS_CONNECTION_ERROR | typeof WS_AUTH_CONNECTION_ERROR;
    WS_GET_MESSAGE: typeof WS_GET_MESSAGE | typeof WS_AUTH_GET_MESSAGE;
    WS_SEND_MESSAGE: typeof WS_SEND_MESSAGE | typeof WS_AUTH_SEND_MESSAGE;
}

export const socketMiddleware = (wsUrl: string, actions: TSocketActions, auth: boolean) => {
    return (store: { dispatch: any; }) => {
        const {
            WS_CONNECTION_START,
            WS_CONNECTION_SUCCESS,
            WS_CONNECTION_CLOSED,
            WS_CONNECTION_ERROR,
            WS_GET_MESSAGE,
            WS_SEND_MESSAGE
        } = actions;
        let socket: WebSocket | null = null;
        return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(`${wsUrl}${auth ? '?token=' + getCookie('accessToken') : ''}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch({type: WS_GET_MESSAGE, payload: parsedData});
                };

                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event});
                };

                if (type === WS_SEND_MESSAGE) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    };
};

export default socketMiddleware;