import {
    LOAD_USER
} from './actionTypes';

const initState = {
    urlInput: '',
    imgUrl: '',
    boxesArr: [],
    route: 'signIn',
    isSignedIn: false,
    user: {
        name: ''
    }
};

export const xpungeApp(state = initState, action) {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,           // { user: { name: ''} }
                ...action.payload   // { user: { name: ''} }
            };
        default:
            return state;
    }
};