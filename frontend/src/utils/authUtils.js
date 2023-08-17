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
  dispatch(setCurrentUser(userPojo))
  return res
}