import * as constants from '../actions/types';

const initState = {
    boxes: []
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case constants.DETECT_FACES:
            return { ...state, boxes: action.payload};
        default:
            return state;
    }
};