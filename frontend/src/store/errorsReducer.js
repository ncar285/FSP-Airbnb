import { combineReducers } from "redux"

export const RECEIVE_ERROR = 'RECEIVE_ERROR'

export const receiveError = error => ({
    type: RECEIVE_ERROR,
    payload: error
})


export const getBookingErrors = state => state.errors.bookings[0]


export const bookingErrorsReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECEIVE_ERROR:     
        return action.payload
        default:
            return state
            
        }
        
 }


 export const errorsReducer = combineReducers({
        listings : ()=> {return {}},
        bookings: bookingErrorsReducer
 })