/* eslint-disable import/no-mutable-exports */
import { Dashboard } from './pages/Dashboard';

/* eslint-disable react/jsx-no-undef */

const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}
let dasboardConfig = {};
if (!userRoles) {
  dasboardConfig = {};
}
dasboardConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: userRoles === undefined ? undefined : 'apps/dashboard/dashboardPages',
      element: <Dashboard />,
    },
  ],
};

export default dasboardConfig;
