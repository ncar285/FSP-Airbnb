import csrfFetch from "../store/csrf"

// create a booking
export const postBooking = async booking => {
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ booking })
    })
    return res;
}

// update a booking
export const patchBooking = async bookingData => {
    const res = await csrfFetch(`/api/bookings/${bookingData.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ booking: bookingData })
    })
    return await res.json()
}

// delete booking
export const destroyBooking = async bookingId => {
    await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })
}