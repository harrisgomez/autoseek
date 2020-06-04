// ! Action creators can be impure.
// ! Handle business logic here prior to dispatching action to the reducer.
import Clarifai from 'clarifai';
import {
    LOAD_USER,
    CHANGE_ROUTE,
    DETECT_FACES
} from './types';

const clarifaiApp = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

// thunk required to dispatch async action
export const detectFaces = url => dispatch => {
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, url)
        .then(response => {
            const faceLocationsArr = calculateFaceLocation(response);
            
            dispatch({
                type: DETECT_FACES,
                payload: faceLocationsArr
            });
        })
        .catch(console.error);

    function calculateFaceLocation(data) {
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
};

export const loadUser = userObj => ({
    type: LOAD_USER,
    payload: userObj
});

export const changeRoute = route => ({
    type: CHANGE_ROUTE,
    payload: route
});