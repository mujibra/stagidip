/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import ViewNewMachine from './newMachine/ViewNewMachine';
import { ViewOldMachine } from './oldMachine/ViewOldMachine';

const ViewStagingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/viewNewMachine',
      element: <ViewNewMachine />,
    },
    {
      path: 'apps/viewOldMachine',
      element: <ViewOldMachine />,
    },
  ],
};

export default ViewStagingConfig;
