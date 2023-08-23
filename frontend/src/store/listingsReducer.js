import { fetchAllListings, fetchOneListing} from "../utils/listingApiUtils.js"

// CONSTANTS
export const RECEIVE_LISTING = 'RECEIVE_LISTING'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const REMOVE_LISTING  = 'REMOVE_LISTING'

// ACTION CREATORS
export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  payload: listing
})

// be careful - teas parameter could be an array or object
export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  payload: listings
})

export const removeListing = listingId => ({
  type: REMOVE_LISTING,
  payload: listingId
})


// THUNK ACTION CREATORS
export const fetchListings = () => async dispatch => {
  const listings = await fetchAllListings()
  return dispatch(receiveListings(listings))
}
  
export const fetchListing = listingId => dispatch => (
  fetchOneListing(listingId)
    .then(data => (
      dispatch(receiveListing(data))
    )
  )
)

// SELECTORS
export const selectAllListings = state => Object.values(state.listings);

export const selectListing = listingId => state => state.listings[listingId] || null;

// export const getListingRevews = listingId => state.rev

// REDUCER
const listingsReducer = (state = {}, action) => {
  const nextState = { ...state }
  switch (action.type) {
    case RECEIVE_LISTING:
      nextState[action.payload.id] = action.payload
      return nextState
    case RECEIVE_LISTINGS:
      return Object.assign(nextState, action.payload)
    case REMOVE_LISTING:
      delete nextState[action.payload]
      return nextState
    default:
      return state
  }
}

export default listingsReducer;
