// ! Action creators can be impure.
// ! Handle business logic here prior to dispatching action to the reducer.
import { handleFetchErrorsUtil } from '../utils';
import Clarifai from 'clarifai';
import {
    LOAD_USER,
    CHANGE_ROUTE,
    DETECT_FACES
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

const registerUser = userObj => {
    return fetch('/api/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
    });
};

// * ACTIONS

export const loadUser = userInfo => ({
    type: LOAD_USER,
    payload: userInfo
});

export const changeRoute = routeStr => ({
    type: CHANGE_ROUTE,
    payload: routeStr
});

export const detectFaces = facesArr => ({
    type: DETECT_FACES,
    payload: facesArr
});

// * ACTION CREATORS 

export const onLoadUser = userObj => dispatch => {
    let userInfo = !!window.location.hostname.match('github')
        ? JSON.parse(sessionStorage.getItem('localUser'))
        : { name: userObj.name };

    // Async actions return the dispatched action(s)
    return dispatch(loadUser(userInfo));
};

export const onUserRegistration = newUserObj => dispatch => {
    // Demo app deployed to Github stores data to local storage instead db
    const isGithubDemo = !!window.location.hostname.match('github');

    if (isGithubDemo) {
        sessionStorage.setItem('localUser', JSON.stringify(newUserObj)); // sessionStorage able to store strings only
        dispatch(loadUser(newUserObj));
        dispatch(changeRoute('home'));
    }

    // Do not use catch, because errors occured during rendering
    // should be handled by React Error Boundaries
    // https://reactjs.org/docs/error-boundaries.html
    return registerUser(newUserObj)
        .then(handleFetchErrorsUtil)
        .then(user => {
            const userInfo = { name: user.name };

            // if (user.id) {
                dispatch(loadUser(userInfo));
                dispatch(changeRoute('home'));
            // }
        });
};

// thunk required to dispatch async action
export const onDetectFaces = url => dispatch => {
    return getClarifaiFaceDetectModel(url)
        .then(response => {
            const faceLocationsArr = getFaceLocationArr(response);

            dispatch(detectFaces(faceLocationsArr));
        });
};