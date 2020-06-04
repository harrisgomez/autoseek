// ! Reducers must be pure functions.
import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import imageReducer from './image-reducer';
import routeReducer from './route-reducer';

export default combineReducers({
    user: userReducer,
    image: imageReducer,
    route: routeReducer
});