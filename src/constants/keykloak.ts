import Keycloack from 'keycloak-js';

const keycloack = Keycloack({
  url: 'http://id-test.neoflex.ru/auth/',
  realm: 'mobile-platform',
  clientId: 'admin',
});

export default keycloack;
