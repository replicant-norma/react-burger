import {
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE
} from '../actions/ws-auth-action';

const initialState = {
    wsConnected: false,
    ordersAll: null,
    error: ''
};

import {wsAuthReducer} from "./ws-auth-reducer";

describe('wsAuthReducer', () => {
    it('Test the initial state', () => {
        expect(wsAuthReducer(initialState, {})).toEqual(
            {
                wsConnected: false,
                ordersAll: null,
                error: ''
            }
        )
    })
    it('Test WS_AUTH_CONNECTION_START', () => {
        expect(wsAuthReducer(initialState, {type: WS_AUTH_CONNECTION_START}))
            .toEqual({...initialState})
    })
    it('Test WS_AUTH_CONNECTION_SUCCESS', () => {
        expect(wsAuthReducer(initialState, {type: WS_AUTH_CONNECTION_SUCCESS, error: null, wsConnected: true}))
            .toEqual({...initialState, error: null, wsConnected: true})
    })
    it('Test WS_AUTH_CONNECTION_ERROR', () => {
        expect(wsAuthReducer(initialState, {type: WS_AUTH_CONNECTION_ERROR, payload: "Failed", wsConnected: false}))
            .toEqual({...initialState, error: "Failed", wsConnected: false})
    })

    it('Test WS_AUTH_CONNECTION_CLOSED', () => {
        expect(wsAuthReducer(initialState, {type: WS_AUTH_CONNECTION_CLOSED, error: null, wsConnected: false}))
            .toEqual({...initialState, error: null, wsConnected: false})
    })

    it('Test WS_GET_MESSAGE', () => {
        expect(wsAuthReducer(initialState, {
            type: WS_AUTH_GET_MESSAGE, payload:
                {id: 5, orders: [{id: 123, ingredients: ['82836402', '909hd87shs', 'fascdfsra9879']}]}
        }))
            .toEqual({
                ...initialState, error: null,
                ordersAll: {id: 5, orders: [{id: 123, ingredients: ['82836402', '909hd87shs', 'fascdfsra9879']}]}
            })
    })
})