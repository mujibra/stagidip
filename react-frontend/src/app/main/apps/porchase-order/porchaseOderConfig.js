/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import PoParrent from './pages/PoParrent';

const porchaseOderConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/porcaheOrder',
      element: <PoParrent />,
    },
    {
      path: '/apps/porcaheOrder/pages',
      element: <PoParrent />,
    },
  ],
};

export default porchaseOderConfig;
