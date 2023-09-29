import { postReview } from "../utils/reviewApiUtils";
import { patchReview } from "../utils/reviewApiUtils";
import { deleteReview } from "../utils/reviewApiUtils";
import { addReviewToBooking, removeReviewFromBooking } from "./bookingsReducer";
import { createSelector } from 'reselect';

//CONSTANTS
export const RECEIVE_MY_REVIEW = 'RECEIVE_MY_REVIEW'
export const REMOVE_MY_REVIEW = 'DELETE_MY_REVIEWS'
export const RECEIVE_MY_REVIEWS = 'RECEIVE_MY_REVIEWS'


// export const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW'
export const SET_CURRENT_REVIEWS = 'SET_CURRENT_REVIEWS'
export const REMOVE_CURRENT_REVIEW = 'REMOVE_CURRENT_REVIEW'

// ACTION CREATORS
export const setCurrentReviews = (reviews) => {
    return {
        type: SET_CURRENT_REVIEWS,
        payload: reviews
    };
};

const removeCurrentReview = (reviewId) => {
    return {
        type: REMOVE_CURRENT_REVIEW,
        payload: reviewId
    };
}

// SELECTORS 
export const getUserReview = state => {
    const userId = state.session.user ? state.session.user.id : null
    if (userId && state.reviews){
        return Object.values(state.reviews).find(review => review.authorId === userId) || null;
    } else {
        return null;
    }
}

// export const getListingRevews = state => state.reviews ? Object.values(state.reviews) : null
export const getListingRevews = createSelector(
    [state => state.reviews],
    (reviews) => reviews ? Object.values(reviews) : null
);

// export const getUserRevews = state => state.reviews? Object.values(state.reviews.myReviews) : null




// THUNK ACTION CREATORS

export const createReview = reviewData => async (dispatch) => {
    const review = await postReview(reviewData);
    // receiveReview(review)
    dispatch(addReviewToBooking(review))
};


export const updateReview = reviewData => async (dispatch) => {
    const review = await patchReview(reviewData);
    // receiveReview(review)
    dispatch(addReviewToBooking(review))
};

export const deleteUserReview = review => async (dispatch) => {
    await deleteReview(review.id);
    dispatch(removeReviewFromBooking(review.booking_id))
    dispatch(removeCurrentReview(review.id));
};


// REDUCER
const initialState = {};
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_REVIEWS:
            return { ...action.payload };
        case REMOVE_CURRENT_REVIEW:
            return { };
    
    default:
        return state;
    }
};

export default reviewsReducer