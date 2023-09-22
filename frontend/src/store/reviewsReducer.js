import { postReview } from "../utils/reviewApiUtils";
import { patchReview } from "../utils/reviewApiUtils";
import { deleteReview } from "../utils/reviewApiUtils";
import { addReviewToBooking } from "./bookingsReducer";

//CONSTANTS
export const RECEIVE_MY_REVIEW = 'RECEIVE_MY_REVIEW'
export const REMOVE_MY_REVIEW = 'DELETE_MY_REVIEWS'
export const RECEIVE_MY_REVIEWS = 'RECEIVE_MY_REVIEWS'


// export const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW'
export const SET_CURRENT_REVIEWS = 'SET_CURRENT_REVIEWS'
export const REMOVE_CURRENT_REVIEW = 'REMOVE_CURRENT_REVIEW'

// ACTION CREATORS

// export const receiveReview = (review) => {
//     return {
//         type: RECEIVE_MY_REVIEW,
//         payload: review
//     };
// };

// export const removeReview = (reviewId) => {
//     return {
//         type: REMOVE_MY_REVIEW,
//         payload: reviewId
//     };
// };

// export const receiveReviews = (reviews) => {
//     return {
//         type: RECEIVE_MY_REVIEWS,
//         payload: reviews
//     };
// };

// export const setCurrentReview = (review) => {
//     return {
//         type: SET_CURRENT_REVIEW,
//         payload: review
//     };
// };

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

export const getListingRevews = state => state.reviews? Object.values(state.reviews.listingReviews) : null

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

export const deleteUserReview = reviewId => async (dispatch) => {
    await deleteReview(reviewId);
    dispatch(removeCurrentReview(reviewId));
};




// REDUCER
const initialState = {
    // myReviews: {},
    // listingReviews: {}
};

const reviewsReducer = (state = initialState, action) => {
    // const newState = {...state}
    switch (action.type) {
        // case RECEIVE_MY_REVIEW:
        //     const newList = {...state.myReviews, [action.payload.id]: action.payload }
        //     return {...state, myReviews: newList}
        // case REMOVE_MY_REVIEW:
        //     const { [action.payload]: _, ...remainingReviews } = state.myReviews;
        //     return { ...state, myReviews: remainingReviews };
        // case RECEIVE_MY_REVIEWS:
        //     return {...state, myReviews: action.payload}


    //     case SET_CURRENT_REVIEW:
    // return { ...state, [action.payload.id]: action.payload };
        case SET_CURRENT_REVIEWS:
            return { ...action.payload };
        case REMOVE_CURRENT_REVIEW:
            return { };
    
    default:
        return state;
    }
};

export default reviewsReducer