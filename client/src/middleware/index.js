import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'; // Allows reducers in Redux to recognize actions that are emitted as functions, and not only objects. Gives Redux a way to dispatch multiple/async actions.

const isGithubDemo = !!window.location.hostname.match('github');

let middleware = [thunk];

if (process.env.NODE_ENV === 'production' || isGithubDemo) {
    middleware = [...middleware];
} else {
    const logger = createLogger();

    middleware = [...middleware, logger];
}

export default middleware;