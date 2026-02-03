/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import SpesificationParent from './pages/SpesificationParent';

const SpesificationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/spesification',
      element: <SpesificationParent />,
    },
  ],
};

export default SpesificationConfig;
