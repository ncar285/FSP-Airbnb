
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';

// import usersReducer from './usersReducer';


import sessionsReducer from './sessionsReducer';

import logger from 'redux-logger';


export const rootReducer = combineReducers({ 
    ui: uiReducer,
    session: sessionsReducer,
    // users: usersReducer
})


export default function configureStore(preloadedState={}){
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
}
