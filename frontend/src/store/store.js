import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import sessionsReducer from './sessionsReducer';
import logger from 'redux-logger';
import listingsReducer from './listingsReducer';


export const rootReducer = combineReducers({ 
    ui: uiReducer,
    session: sessionsReducer,
    listings: listingsReducer
})

export default function configureStore(preloadedState={}){
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
}
