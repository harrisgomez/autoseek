import * as constants from '../actions/types';

const initState = {
    boxes: []
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case constants.DETECT_FACES:
            return { ...state, boxes: action.payload};
        case constants.RESET_FACES:
            return { ...state, boxes: [] };
        default:
            return state;
    }
};