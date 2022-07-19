import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {reportWebVitals, globalStore} from './utils';
import App from './containers/App';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import keycloack from 'constants/keykloak';
import {DndWrapper} from 'containers/DnDWrapper';
import {ReactNotifications} from 'react-notifications-component';

ReactDOM.render(
  <Provider store={globalStore}>
    <ReactNotifications />
    <ReactKeycloakProvider authClient={keycloack}>
      <div id="APP">
        <DndWrapper id="APP">
          <Router>
            <App />
          </Router>
        </DndWrapper>
      </div>
    </ReactKeycloakProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
