import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'; // Allows reducers in Redux to recognize actions that are emitted as functions, and not only objects. Gives Redux a way to dispatch multiple/async actions.

const logger = createLogger();

// Note the Array export
export default [
    thunk,
    logger
];

