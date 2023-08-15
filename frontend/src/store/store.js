
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import sessionsReducer from './sessionsReducer';
import usersReducer from './usersReducer';
import logger from 'redux-logger';


export const rootReducer = combineReducers({ 
    ui: uiReducer,
    session: sessionReducer,
    users: usersReducer
})


export default function configureStore(preloadedState={}){
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
}

// const configureStore = (initialState = {}) => (
//     createStore(rootReducer, initialState)
// )

// export default configureStore