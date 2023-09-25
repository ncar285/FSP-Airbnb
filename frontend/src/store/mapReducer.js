
// CONSTANTS
export const RECEIVE_LISTING_MAP_DATA  = 'RECEIVE_LISTING_MAP_DATA'

// ACTION CREATORS
export const receiveListingMapData = listingsData => ({
  type: RECEIVE_LISTING_MAP_DATA,
  payload: listingsData,
});


export const fetchMapIndex = () => async dispatch => {
  try {
    const res = await fetch(`/api/listings/map_index`);
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveListingMapData(data));
    } else {
      // error handling
      // dispatch(receiveListingMapError("Failed to fetch data"));
    }
  } catch (error) {
    // error handling
    // dispatch(receiveListingMapError(error.message));
  }
};


// REDUCER
const mapReducer = (state = {}, action) => {
//   const nextState = { ...state }
  switch (action.type) {
    case RECEIVE_LISTING_MAP_DATA:
      return {...action.payload}
    default:
      return state
  }
}

export default mapReducer;
