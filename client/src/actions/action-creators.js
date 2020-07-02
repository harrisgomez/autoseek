// ! Action creators can be impure.
// ! Handle business logic here prior to dispatching action to the reducer.
import { handleFetchErrorsUtil } from '../utils';
import Clarifai from 'clarifai';
import {
    LOAD_USER,
    RESET_USER,
    CHANGE_ROUTE,
    DETECT_FACES,
    RESET_FACES,
    REGISTER_USER,
    SIGNIN_USER
} from './types';

const clarifaiApp = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

// * UTILITY FUNCTIONS

const getClarifaiFaceDetectModel = url => {
    return clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, url);
};

const getFaceLocationArr = data => {
    const img = document.getElementById('inputImg');
    const width = Number(img.width);
    const height = Number(img.height);
    const boxRegionsArr = data.outputs[0].data.regions;
    const boundingBoxArr = boxRegionsArr.map(region => {
        const {
            left_col,
            top_row,
            right_col,
            bottom_row
        } = region.region_info.bounding_box;

        return {
            id: region.id,
            leftCol: left_col * width,
            topRow: top_row * height,
            rightCol: width - (right_col * width),
            botRow: height - (bottom_row * height)
        };
    });

    return boundingBoxArr;
};

const isFormValid = (formType, userInfo) => {
    const { name, email, password } = userInfo;

    if (formType === 'signin') return email && password;
    if (formType === 'register') return name && email && password;
};

const registerUser = userObj => {
    return fetch('/api/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
    });
};

const signinUser = userObj => {
    return fetch('/api/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
    });
}

// * ACTIONS

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

// * ACTION CREATORS 

export const doLoadUser = userObj => dispatch => {
    let userInfo = !!window.location.hostname.match('github')
        ? JSON.parse(sessionStorage.getItem('localUser'))
        : { name: userObj.name };

    // Async actions return the dispatched action(s)
    return dispatch(loadUser(userInfo));
};

// thunk required to dispatch async action
export const doDetectFaces = url => dispatch => {
    return getClarifaiFaceDetectModel(url)
        .then(response => {
            const faceLocationsArr = getFaceLocationArr(response);

            dispatch(detectFaces(faceLocationsArr));
        });
};

export const doRegisterSubmit = registerFormObj => dispatch => {
    // Demo app deployed to Github stores data to local storage instead db
    const isGithubDemo = !!window.location.hostname.match('github');

    if (isGithubDemo && isFormValid('register', registerFormObj)) {
        sessionStorage.setItem('localUser', JSON.stringify(registerFormObj)); // sessionStorage able to store strings only
        dispatch(loadUser(registerFormObj));
        dispatch(changeRoute('home'));
    }

    return registerUser(registerFormObj)
        .then(handleFetchErrorsUtil)
        .then(user => {
            if (!user.name) throw new Error('User registration error, that account already exists.');
            
            dispatch(loadUser({ name: user.name}));
            dispatch(changeRoute('home'));
        })
        .catch(err => console.error('User registration error, please try again.', err))
};

export const doSigninSubmit = signinFormObj => dispatch => {
    const { email, password } = signinFormObj;
    const isGithubDemo = !!window.location.hostname.match('github');

    if (isGithubDemo && isFormValid('signin', signinFormObj)) {
        const user = JSON.parse(sessionStorage.getItem('localUser'));

        if (user.email === email && user.password === password) {
            dispatch(loadUser(user));
            dispatch(changeRoute('home'));
        }
    }

    return signinUser(signinFormObj)
        .then(handleFetchErrorsUtil)
        .then(user => {
            dispatch(loadUser({ name: user.name }));
            dispatch(changeRoute('home'));
        })
        .catch(err => console.error('User signin error, please try again.', err))
};

export const doRouteChange = route => dispatch => {
    if (route !== 'home') dispatch(resetUser());
    return dispatch(changeRoute(route));
};