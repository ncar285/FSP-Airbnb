import { postReview } from "../utils/reviewApiUtils";

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

// const removeCurrentReview = () => {
//     return {
//         type: REMOVE_CURRENT_REVIEW
//     };
// }

// SELECTORS 
export const getUserReview = userId => state => {
    if (state.reviews){
        state.reviews.forEach(review => {
            if(review.author_id === userId){
                return review
            }
        })
    }
}



// THUNK ACTION CREATORS

export const createReview = reviewData => async (dispatch) => {
    const review = await postReview(reviewData);
    sessionStorage.setItem("review", JSON.stringify(review))
    dispatch(setCurrentReview(review));
};


// REDUCER
const initialState = {};
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_REVIEW:
    return { ...state, review: action.payload };
    
        case SET_CURRENT_REVIEWS:
    return { ...state, reviews: action.payload };
    //     case REMOVE_CURRENT_REVIEW:
    // return { ...state, review: null };
    default:
        return state;
    }
};

export default reviewsReducer