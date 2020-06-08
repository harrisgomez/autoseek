import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'; // Allows reducers in Redux to recognize actions that are emitted as functions, and not only objects. Gives Redux a way to dispatch multiple/async actions.

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();

    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

export default middleware;