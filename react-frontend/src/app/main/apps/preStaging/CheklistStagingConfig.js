/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import ChceklistStagingParrent from './pages/ChceklistStagingParrent';

const CheklistStagingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/stagging/checklistStagging/',
      element: <ChceklistStagingParrent />,
    },
  ],
};

export default CheklistStagingConfig;
