import { postBooking, patchBooking, destroyBooking } from "../utils/bookingApiUtils";
import { RECEIVE_USER } from "./usersReducer";
import { receiveError } from "./errorsReducer";

export const RECEIVE_BOOKING = 'RECEIVE_BOOKING'
export const REMOVE_BOOKING  = 'REMOVE_BOOKING'
export const REPLACE_BOOKING = 'REPLACE_BOOKING'

export const ADD_REVIEW_TO_BOOKING = 'ADD_REVIEW_TO_BOOKING'
export const REMOVE_REVIEW_FROM_BOOKING = 'REMOVE_REVIEW_FROM_BOOKING'

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

export const addReviewToBooking = review => ({
    type: ADD_REVIEW_TO_BOOKING,
    payload: review
})

export const removeReviewFromBooking = bookingId => ({
    type: REMOVE_REVIEW_FROM_BOOKING,
    payload: bookingId
})


// SELECTORS 

export const getBookings = state => state.bookings
export const getBooking = id => state => state.bookings[id] 
// export const getCurrentBookings = state => {
//     const today = new Date()
//     return Object.values(state.bookings).filter(booking => new Date(booking.startDate) <= today && new Date(booking.endDate) >= today)
// }
// export const getUpcomingBookings = state => {
//     const today = new Date()
//     return Object.values(state.bookings).filter(booking => new Date(booking.startDate) > today).sort(booking => booking.startDate)
// }
// export const getPreviousBookings = state => {
//     const today = new Date()
//     return Object.values(state.bookings).filter(booking => new Date(booking.endDate) < today).sort(booking => booking.startDate)
// }


// THUNK ACTION CREATORS
export const createBooking = (bookingData) => async (dispatch) => {
    try {
        const res = await postBooking(bookingData);
        const booking = await res.json();
        dispatch(receiveBooking(booking));
        return { ok: true };
    } catch (err) {
        const errors = await err.json();
        dispatch(receiveError(errors));
        return { ok: false, errors };
    }
};

export const updateBooking = bookingData => async (dispatch) => {
    const booking = await patchBooking(bookingData);
    return booking
    // dispatch(replaceBooking(booking));
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
        case ADD_REVIEW_TO_BOOKING:
            const bookingId = action.payload.bookingId
            state[bookingId].myReview = action.payload

            return {...state}
        case REMOVE_REVIEW_FROM_BOOKING: 
            if (state[action.payload]) {
                state[action.payload].myReview = null
            } 
            return { ...state};
            
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