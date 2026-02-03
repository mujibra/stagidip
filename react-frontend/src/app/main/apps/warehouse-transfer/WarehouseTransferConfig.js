/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import WarehouseTransferParent from './pages/WarehouseTransferParent';

const WarehouseTransferConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/warehouseTransfer',
      element: <WarehouseTransferParent />,
    },
  ],
};

export default WarehouseTransferConfig;
