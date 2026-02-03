import { lazy } from 'react';

const OldMachine = lazy(() => import('./OldMachine'));

const OldMachineConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/stagging/oldMachine/*',
      element: <OldMachine />,
    },
  ],
};

export default OldMachineConfig;
