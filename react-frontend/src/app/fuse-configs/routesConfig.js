/* eslint-disable import/no-mutable-exports */
import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import appConfig from 'app/main/apps/appsConfig';
import LoginConfig from 'app/login/LoginConfig';
import ForgotPasswordConfig from 'app/forgotPassword/ForgotPasswordConfig';

const routeConfigs = [ExampleConfig, ...appConfig, LoginConfig, ForgotPasswordConfig];
const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}
let routes = [];
if (!userRoles) {
  routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: <FuseLoading />,
    },
    {
      path: '/forgot-password',
      element: <FuseLoading />,
    },
    {
      path: '/login',
      element: <Error404Page />,
    },
    {
      path: '*',
      element: <Navigate to="/login" />,
    },
  ];
} else if (userRoles === 'OPERATOR_MOVER') {
  routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
      path: '/',
      element: <Navigate to="/apps/stagging/inspeksiTestings/" />,
    },
    {
      path: 'loading',
      element: <FuseLoading />,
    },
    {
      path: '404',
      element: <Error404Page />,
    },
    {
      path: '*',
      element: <Navigate to="404" />,
    },
  ];
} else if (userRoles === 'GUEST_BANK') {
  routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
      path: '/',
      element: <Navigate to="apps/spesification" />,
    },
    {
      path: 'loading',
      element: <FuseLoading />,
    },
    {
      path: '404',
      element: <Error404Page />,
    },
    {
      path: '*',
      element: <Navigate to="404" />,
    },
  ];
} else {
  routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    // {
    //   path: '/',
    //   element: <Navigate to="/login" />,
    // },
    {
      path: 'loading',
      element: <FuseLoading />,
    },
    {
      path: '404',
      element: <Error404Page />,
    },
    {
      path: '*',
      element: <Navigate to="404" />,
    },
  ];
}

export default routes;
