import { deleteSession, postSession, postUser } from "../utils/sessionApiUtils";

// CONSTANTS
const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

// ACTION CREATORS
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
}

// SELECTORS
export const getCurrentUser = state => state.session.user ? state.session.user : null

// THUNK ACTION CREATORS

export const createUser = userData => async (dispatch) => {
  const user = await postUser(userData);
  sessionStorage.setItem("currentUser", JSON.stringify(user))
  dispatch(setCurrentUser(user));
};

export const login = credentials => async (dispatch) => {
  const response = await postSession(credentials);
  sessionStorage.setItem("currentUser", JSON.stringify(response))
  // const data = await response.json();
  dispatch(setCurrentUser(response));
  return response
};

export const logoutUser = () => async (dispatch) => {
  await deleteSession();
  sessionStorage.setItem('currentUser', null);
  dispatch(removeCurrentUser());
};
  
const initialState = {};
  
const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionsReducer