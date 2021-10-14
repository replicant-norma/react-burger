import {getCookie} from "../../utils/utils";


export const socketMiddleware = (wsUrl:string, actions: any, auth:boolean) => {
    return (store: { dispatch: any; getState: any; })  => {
        const {
            WS_CONNECTION_START,
            WS_CONNECTION_SUCCESS,
            WS_CONNECTION_CLOSED,
            WS_CONNECTION_ERROR,
            WS_GET_MESSAGE,
            WS_SEND_MESSAGE
        }: any = actions;
        let socket: WebSocket|null = null;
        return (next: (arg0: { type: any; payload: any; }) => void) => (action: { type: any; payload: any; }) => {
            const {dispatch, getState} = store;
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