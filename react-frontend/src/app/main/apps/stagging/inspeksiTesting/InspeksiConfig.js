/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import InpeksiParrent from './pages/InpeksiParrent';

const InspeksiConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/stagging/inspeksiTestings/',
      element: <InpeksiParrent />,
    },
  ],
};

export default InspeksiConfig;
