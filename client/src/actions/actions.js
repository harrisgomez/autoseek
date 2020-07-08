import {
    LOAD_USER,
    RESET_USER,
    CHANGE_ROUTE,
    DETECT_FACES,
    RESET_FACES,
    REGISTER_USER,
    SIGNIN_USER
} from './types';

export const loadUser = userInfo => ({
    type: LOAD_USER,
    payload: userInfo
});

export const resetUser = () => ({
    type: RESET_USER
});

export const changeRoute = routeStr => ({
    type: CHANGE_ROUTE,
    payload: routeStr
});

export const detectFaces = facesArr => ({
    type: DETECT_FACES,
    payload: facesArr
});

export const resetFaces = () => ({
    type: RESET_FACES
});

export const userSignin = signinFormObj => ({
    type: SIGNIN_USER,
    payload: signinFormObj
});

export const userRegistration = registerFormObj => ({
    type: REGISTER_USER,
    payload: registerFormObj
});