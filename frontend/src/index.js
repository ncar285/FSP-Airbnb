import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { activateSessionModal, deactivateSessionModal } from './store/uiReducer';
import { Provider } from 'react-redux'

const store = configureStore()

window.store = store
window.activate = activateSessionModal
window.deactivate = deactivateSessionModal

const root = document.getElementById('root')

ReactDOM.createRoot(root)
  .render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  )


