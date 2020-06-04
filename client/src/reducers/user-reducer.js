import * as constants from '../actions/types';

const initState = {
    userInfo: {},
    isSignedIn: false
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case constants.LOAD_USER:
            return { ...state, userInfo: action.payload, isSignedIn: true };
        default:
            return state;
    }
};