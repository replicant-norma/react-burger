import {getCookie} from "../../utils/utils";

export const socketMiddleware = (wsUrl, actions, auth) => {
    return store => {
        const {
            WS_CONNECTION_START,
            WS_CONNECTION_SUCCESS,
            WS_CONNECTION_CLOSED,
            WS_CONNECTION_ERROR,
            WS_GET_MESSAGE,
            WS_SEND_MESSAGE
        } = actions;
        let token = null;
        if (auth){
            token = getCookie('accessToken');
            wsUrl += `?token=${token}`;
        }
        let socket = null;
        return next => action => {
            const {dispatch, getState} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(wsUrl);
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