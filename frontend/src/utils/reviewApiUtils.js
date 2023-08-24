import csrfFetch from "../store/csrf"

// create a review
export const postReview = async review => {
    debugger

    const newReview = {
        listing_id: review.listing_id,
        author_id: review.listing_id,
        body: review.listing_id,
        cleanliness: review.listing_id,
        communication: review.listing_id,
        check_in: review.listing_id,
        accuracy: review.listing_id,
        location: review.listing_id,
        value: review.listing_id
    }
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })
    const newReview = await res.json()
    return newReview
}

export const patchReview = async reviewData => {
    const res = await csrfFetch(`/api/reviews/${reviewData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(reviewData)
    })
    const review = await res.json()
    return review
}

export const deleteReview = async reviewId => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })
}