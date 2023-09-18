import { postBooking, patchBooking, destroyBooking } from "../utils/bookingApiUtils";
import { RECEIVE_USER } from "./usersReducer";
import { receiveError } from "./errorsReducer";

export const RECEIVE_BOOKING = 'RECEIVE_BOOKING'
export const REMOVE_BOOKING  = 'REMOVE_BOOKING'
export const REPLACE_BOOKING = 'REPLACE_BOOKING'

// ACTION CREATORS 
export const receiveBooking = booking => {
    return {
        type: RECEIVE_BOOKING,
        payload: booking
    };
};

export const removeBooking = bookingId => ({
    type: REMOVE_BOOKING,
    payload: bookingId
})

export const replaceBooking = bookingData => ({
    type: REPLACE_BOOKING,
    payload: bookingData
})


// SELECTORS 
export const getBookings = state => state.bookings


// THUNK ACTION CREATORS
export const createBooking = bookingData => async (dispatch) => {
    try {
        const res = await postBooking(bookingData);
        const booking = await res.json()
        return dispatch(receiveBooking(booking));

    } catch(err){
        // dispatch(receiveError(
           
        // ))
        const errors = await err.json()
        dispatch(receiveError(errors))
        // return errors

    }
    // if (res.ok){
    // } else {
        // return errors
    // }
};

export const updateBooking = bookingData => async (dispatch) => {
    const booking = await patchBooking(bookingData);
    dispatch(receiveBooking(booking));
};

export const deleteBooking = bookingId => async (dispatch) => {
   
    await destroyBooking(bookingId);
    dispatch(removeBooking(bookingId));
};


// REDUCER
const initialState = {};
const bookingsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_BOOKING:
    return { ...state, [action.payload.id]: action.payload };
    //     case SET_CURRENT_REVIEWS:
    // return { ...state, ...action.payload };
        case REMOVE_BOOKING:
            delete newState[action.payload]
            return newState;
        case REPLACE_BOOKING:
            newState[action.payload.id] = action.payload
            return newState;
        case RECEIVE_USER:
            return action.payload.bookings
    default:
        return state;
    }
};

export default bookingsReducer