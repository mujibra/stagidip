import { authRoles } from 'app/auth';
import ForgotPassword from './Index';

const LoginConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
  ],
};

export default LoginConfig;
