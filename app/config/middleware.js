/*
 * Export additional middleware you want to use in your Redux reducers here.
 */

import thunkMiddleware from 'redux-thunk';
import {asyncMiddleware} from 'redux-happy-async';

export default [
  thunkMiddleware,
  asyncMiddleware,
];
