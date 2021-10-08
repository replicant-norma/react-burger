import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws-action';

const initialState = {
    wsConnected: false,
    ordersAll: null,
    error: ''
};

import {wsReducer} from "./ws-reducer";

describe('wsReducer', () => {
    it('Test the initial state', () => {
        expect(wsReducer(initialState, {})).toEqual(
            {
                wsConnected: false,
                ordersAll: null,
                error: ''
            }
        )
    })
    it('Test WS_CONNECTION_START', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_START}))
            .toEqual({...initialState})
    })
    it('Test WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS, error: null, wsConnected: true}))
            .toEqual({...initialState, error: null, wsConnected: true})
    })
    it('Test WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_ERROR, payload: "Failed", wsConnected: false}))
            .toEqual({...initialState, error: "Failed", wsConnected: false})
    })

    it('Test WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_CLOSED, error: null, wsConnected: false}))
            .toEqual({...initialState, error: null, wsConnected: false})
    })

    it('Test WS_GET_MESSAGE', () => {
        expect(wsReducer(initialState, {
            type: WS_GET_MESSAGE, payload:
                {id: 5, orders: [{id: 123, ingredients: ['82836402', '909hd87shs', 'fascdfsra9879']}]}
        }))
            .toEqual({
                ...initialState, error: null,
                ordersAll: {id: 5, orders: [{id: 123, ingredients: ['82836402', '909hd87shs', 'fascdfsra9879']}]}
            })
    })
})