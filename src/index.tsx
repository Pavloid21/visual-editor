import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './utils/reportWebVitals';
import store from './utils/store';
import App from './containers/App';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import keycloack from 'constants/keykloak';

ReactDOM.render(
  <Provider store={store}>
    <ReactKeycloakProvider authClient={keycloack}>
      <Router>
        <App />
      </Router>
    </ReactKeycloakProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
