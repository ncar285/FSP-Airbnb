import csrfFetch from "../store/csrf"

// create a review
export const postReview = async reviewData => {
    // debugger
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData)
    })
    const review = await res.json()
    return review
}