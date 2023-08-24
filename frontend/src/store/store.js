import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import sessionsReducer from './sessionsReducer';
import logger from 'redux-logger';
import listingsReducer from './listingsReducer';
import reviewsReducer from './reviewsReducer';
import usersReducer from './usersReducer';


export const rootReducer = combineReducers({ 
    ui: uiReducer,
    session: sessionsReducer,
    listings: listingsReducer,
    reviews: reviewsReducer,
    userData: usersReducer
})

export default function configureStore(preloadedState={}){
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
}
