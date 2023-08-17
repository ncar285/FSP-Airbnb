import { setCurrentUser } from "../store/sessionsReducer";
import csrfFetch from "../store/csrf";

const storeCSRFToken = res => {
  const csrfToken = res.headers.get('X-CSRF-Token')
  if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken)
}

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  const data = await res.json();
  let userPojo
  if (data.user === undefined){
    userPojo = data
  }else{
    userPojo = data.user 
  }
  sessionStorage.setItem('currentUser', JSON.stringify(userPojo));
  // sessionStorage.setItem('currentUser', userPojo);
  dispatch(setCurrentUser(userPojo))
  return res
}
// export const restoreSession = () => async dispatch => {
//   const res = await csrfFetch('/api/session');
//   storeCSRFToken(res);
//   debugger
//   const user = await res.json();
//   debugger
//   storeCurrentUser(user);           //!(in the sessionStorage)
//   dispatch(setCurrentUser(user))    //!(in the state)
//   return res
// }





//!
// const storeCSRFToken = res => {
//   const csrfToken = res.headers.get('X-CSRF-Token')
//   if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken)
// }

// export const restoreSession = async () => {
//   try {
//     const res = await fetch('/api/session')
//     storeCSRFToken(res);
//     const token = res.headers.get('X-CSRF-Token')
//     if (token) sessionStorage.setItem('X-CSRF-Token', token)
//     if (res.ok) {
//       const data = await res.json()
//       const currentUser = JSON.stringify(data.user) ? JSON.stringify(data.user) : null
//       sessionStorage.setItem('currentUser', currentUser)
//       // sessionStorage.setItem('X-CSRF-Token', token)
//     } else {
//       throw res
//     }
//   } catch {
//     console.error('restoreSession is broken')
//   }
// }





// export const csrfFetch = async (url, options = {}) => {
//   options.method ||= 'GET'
//   options.headers ||= {}

//   if (options.method.toUpperCase() !== 'GET') {
//     // have to skip setting 'Content-Type' header if using formData
//     options.headers['Content-Type'] = 'application/json'
//     options.headers['X-CSRF-Token'] = sessionStorage.getItem('csrfToken')
//   }

//   const res = await fetch(url, options)
//   return res
// }