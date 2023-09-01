import { fetchUserData } from "../utils/sessionApiUtils"

export const RECEIVE_USER = 'RECEIVE_USER'
// export const REMOVE_USER = 'REMOVE_USER'


export const receiveUser = data => ({
    type: RECEIVE_USER,
    payload: data
})

// export const removeUser = userId => ({
//     type: REMOVE_USER,
//     payload: userId
// })

export const fetchUserShow = userId => dispatch => (
    fetchUserData(userId)
        .then(data => (
            dispatch(receiveUser(data))
        )
    )
)
  

export const selectUserData = state => state.userData ? state.userData : null


const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_USER:
            const newState = action.payload
            return newState 
        // case REMOVE_USER:
        //     delete nextState[action.payload];
        //     return { ...nextState };
        default: 
            return state
    }
}

export default usersReducer