import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        //login user

        const { data } = await api.signin(formData);
        // dispatching the type and the data from the above line
        dispatch({ type: AUTH, data });

        // once successful, the app redirects back to the home screen
        history.push('/')
    } catch (err) {
        console.log(err)
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        //signup user
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });

        // once successful, the app redirects back to the home screen
        history.push('/')
    } catch (err) {
        console.log(err)
    }
};

