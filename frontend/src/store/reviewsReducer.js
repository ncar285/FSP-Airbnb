import { postReview } from "../utils/reviewApiUtils";
import { patchReview } from "../utils/reviewApiUtils";
import { deleteReview } from "../utils/reviewApiUtils";

//CONSTANTS
export const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW'
export const SET_CURRENT_REVIEWS = 'SET_CURRENT_REVIEWS'
export const REMOVE_CURRENT_REVIEW = 'REMOVE_CURRENT_REVIEW'

// ACTION CREATORS
export const setCurrentReview = (review) => {
    return {
        type: SET_CURRENT_REVIEW,
        payload: review
    };
};

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

export const getListingRevews = state => state.reviews? Object.values(state.reviews) : null



// THUNK ACTION CREATORS

export const createReview = reviewData => async (dispatch) => {
    const review = await postReview(reviewData);
    sessionStorage.setItem("myReview", JSON.stringify(review))
    dispatch(setCurrentReview(review));
};


export const updateReview = reviewData => async (dispatch) => {
    const review = await patchReview(reviewData);
    sessionStorage.setItem("myReview", JSON.stringify(review))
    dispatch(setCurrentReview(review));
};

export const deleteUserReview = reviewId => async (dispatch) => {
    await deleteReview(reviewId);
    sessionStorage.setItem("myReview", null)
    dispatch(removeCurrentReview(reviewId));
};







// REDUCER
const initialState = {};
const reviewsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case SET_CURRENT_REVIEW:
    return { ...state, [action.payload.id]: action.payload };
        case SET_CURRENT_REVIEWS:
    return { ...state, ...action.payload };
        case REMOVE_CURRENT_REVIEW:
        delete newState[action.payload]
        return newState;
    default:
        return state;
    }
};

export default reviewsReducer