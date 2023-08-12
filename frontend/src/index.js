import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { activateRegisterModal, deactivateRegisterModal } from './store/uiReducer';
import { Provider } from 'react-redux'
import 'normalize.css'

const store = configureStore()

window.store = store
window.activate = activateRegisterModal
window.deactivate = deactivateRegisterModal

const root = document.getElementById('root')

ReactDOM.createRoot(root)
  .render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  )


