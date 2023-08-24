// import { csrfFetch } from "./authUtils";
import csrfFetch from "../store/csrf";



export const fetchUserData = async userId => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        // error handling
    }
}


//signup
export const postUser = async userData => {
    // debugger
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    const user = await res.json()
    return user
}

//login the user 
export const postSession = async credentials => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(credentials)
    })
    const user = await res.json()
    return user
}

//logout the user
export const deleteSession = async () => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    if (res.ok) {
        console.log('logout successful')
    }
}
