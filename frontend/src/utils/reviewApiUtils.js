import csrfFetch from "../store/csrf"

// create a review
export const postReview = async review => {

    const test = {
        listing_id: review.listing_id,
        author_id: review.author_id,
        body: review.body,
        cleanliness: review.cleanliness,
        communication: review.communication,
        check_in: review.checkIn,
        accuracy: review.accuracy,
        location: review.accuracy,
        value: review.accuracy
    }

    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(test)
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