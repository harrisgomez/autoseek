import {
    LOAD_USER
} from './actionTypes';

export const loadUser = user => ({
    type: LOAD_USER,
    user
});