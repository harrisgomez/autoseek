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

export const changeRoute = routeStr => ({
    type: CHANGE_ROUTE,
    payload: routeStr
});

export const loadUser = userObj => dispatch => {
    const userInfo = { name: userObj.name };

    // Return dispatch in async actions
    return dispatch({
        type: LOAD_USER,
        payload: userInfo
    });
};

export const doUserRegistration = newUserObj => dispatch => {
    // Utilize local storage db for demo app on github
    if (!!window.location.hostname.match('github')) {
        sessionStorage.setItem('localUser', JSON.stringify(newUserObj));
        dispatch(loadUser(newUserObj));
        dispatch(changeRoute('home'));
    }

    // Approriate db connection configured in server.js
    return registerUser(newUserObj)
        .then(handleFetchErrorsUtil)
        .then(user => {
            const userInfo = { name: user.name };

            if (user.id) {
                dispatch(loadUser(userInfo));
                dispatch(changeRoute('home'));
            }
        })
        .catch(console.error);
};

// thunk required to dispatch async action
export const detectFaces = url => dispatch => {
    return getClarifaiFaceDetectModel(url)
        .then(response => {
            dispatch({
                type: DETECT_FACES,
                payload: getFaceLocationArr(response)
            });
        })
        .catch(console.error);

    // function calculateFaceLocation(data) {
    //     const img = document.getElementById('inputImg');
    //     const width = Number(img.width);
    //     const height = Number(img.height);
    //     const boxRegionsArr = data.outputs[0].data.regions;
    //     const boundingBoxArr = boxRegionsArr.map(region => {
    //         const {
    //             left_col,
    //             top_row,
    //             right_col,
    //             bottom_row
    //         } = region.region_info.bounding_box;

    //         return {
    //             id: region.id,
    //             leftCol: left_col * width,
    //             topRow: top_row * height,
    //             rightCol: width - (right_col * width),
    //             botRow: height - (bottom_row * height)
    //         };
    //     });

    //     return boundingBoxArr;
    // };
};