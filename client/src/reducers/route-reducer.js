import * as constants from '../actions/types';

const initState = {
    path: 'signIn'
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case constants.CHANGE_ROUTE:
            return { ...state, path: action.payload};
        default:
            return state;
    }
};