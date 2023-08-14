import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { activateRegisterModal, deactivateRegisterModal } from './store/uiReducer';
import { Provider } from 'react-redux'
import 'normalize.css'
import { restoreSession } from './utils/authUtils';

import csrfFetch, { restoreCSRF } from './store/csrf';


const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  // window.activate = activateRegisterModal
  // window.deactivate = deactivateRegisterModal
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

// const currentUser = sessionStorage.getItem('currentUser')
// const csrfToken = sessionStorage.getItem('csrfToken')
// if (!currentUser || !csrfToken){
//   restoreSession().then(renderApp)
// }else {
//   renderApp()
// }

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApp);
} else {
  renderApp();
}

// in rails comnsole:
// attributes = Faker::Internet.user('name', 'name', 'email', 'password')
// User.create(attributes)
// User.create(attributes).tap(&:valid?).errors.messages
