import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { activateRegisterModal, deactivateRegisterModal } from './store/uiReducer';
import { Provider } from 'react-redux'
import 'normalize.css'
import { restoreSession } from './utils/authUtils';
import * as sessionActions from './store/session.js'

import { deleteSession, postSession, postUser } from './utils/sessionApiUtils';
import { createUser, loginUser, logoutUser } from './store/usersReducer';

import csrfFetch, { restoreCSRF } from './store/csrf';


// const currentUser = sessionStorage.getItem('currentUser')
const csrfToken = sessionStorage.getItem('csrfToken')

// let initialState = {}
// const currentUserData = JSON.parse(currentUser)



const store = configureStore()
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.postUser = postUser
  window.postSession = postSession
  window.deleteSession = deleteSession
  window.loginUser = loginUser
  window.logoutUser = logoutUser
  window.createUser = createUser
}

const root = document.getElementById('root')
const renderApp = () => {
  ReactDOM.createRoot(root)
    .render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
    )
}

if (sessionStorage.getItem("X-CSRF-Token") === null || 
  sessionStorage.getItem("currentUser") === null) {
    debugger
  store.dispatch(restoreSession()).then(renderApp);
} else {
  renderApp();
}

