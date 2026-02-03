import { lazy } from 'react';

const NewMachine = lazy(() => import('./NewMachine'));

const NewMachineAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/stagging/newMachine/*',
      element: <NewMachine />,
    },
  ],
};

export default NewMachineAppConfig;
