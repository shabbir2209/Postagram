import { AUTH, LOGOUT } from '../constants/actionTypes';

// auth reducer 
const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        // auth case which returns the auth data
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return { ...state, authData: action?.data};
        // logout functions clears the local storage and logs out the user
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;