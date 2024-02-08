import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'loginRequest' });

        const { data } = await axios.post(
            `${server}/login`,
            { email, password },
            {
                headers: {
                    'Content-type': 'application/json',
                },

                withCredentials: true,
            }
        );

        dispatch({ type: 'loginSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data.message });
    }
};

export const register = formdata => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' });

        const { data } = await axios.post(`${server}/register`, formdata, {
            headers: {
                'Content-type': 'multipart/form-data',
            },

            withCredentials: true,
        });

        dispatch({ type: 'registerSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
};

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: 'loadUserRequest' });

        const { data } = await axios.get(
            `${server}/me`,

            {
                withCredentials: true,
            }
        );

        await dispatch({ type: 'loadUserSuccess', payload: data.user });
    } catch (error) {
        await dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
};

export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutRequest' });

        const { data } = await axios.get(`${server}/logout`, {
            withCredentials: true,
        });
        dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
};

export const buySubscription = (name, symbol, quantity, avgbuyingprice, exchange, code) => async dispatch => {
    try {
        dispatch({ type: 'buySubscriptionRequest' });

        const { data } = await axios.post(`${server}/subscribe`, { name, symbol, quantity, avgbuyingprice, exchange, code }, {
            headers: {
                'Content-type': 'application/json',
            },

            withCredentials: true,
        });

        dispatch({ type: 'buySubscriptionSuccess', payload: data.client_secret });
    } catch (error) {
        dispatch({
            type: 'buySubscriptionFail',
            payload: error.response.data.message,
        });
    }
};


export const sellStock = (symbol, quantity, CurrentPrice) => async dispatch => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' });

        const { data } = await axios.put(`${server}/sellstock`, { symbol, quantity, CurrentPrice }, {
            headers: {
                'Content-type': 'application/json',
            },

            withCredentials: true,
        });


        dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'cancelSubscriptionFail',
            payload: error.response.data.message,
        });
    }
};


