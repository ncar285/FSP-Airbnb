import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store/store';
import { Provider } from 'react-redux'
import 'normalize.css'
import { restoreSession } from './utils/authUtils';
import { createUser, login, logoutUser } from './store/sessionsReducer'
import { deleteSession, postSession, postUser } from './utils/sessionApiUtils';
import csrfFetch from './store/csrf';

const store = configureStore()
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.postUser = postUser
  window.postSession = postSession
  window.deleteSession = deleteSession
  window.loginUser = login
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
  // debugger
  store.dispatch(restoreSession()).then(renderApp);
} else {
  // debugger
  // renderApp();
  store.dispatch(restoreSession()).then(renderApp);
}

