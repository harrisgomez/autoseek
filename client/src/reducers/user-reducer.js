import * as constants from '../actions/types';

const initState = {
    userInfo: {},
    isSignedIn: false
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case constants.LOAD_USER:
            return { ...state, userInfo: action.payload, isSignedIn: true };
        case constants.RESET_USER:
            return { ...state, userInfo: {}, isSignedIn: false };
        default:
            return state;
    }
};