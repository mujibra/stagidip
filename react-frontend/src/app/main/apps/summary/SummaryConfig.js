/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable import/named */
// import { MachineParrent } from './pages/MachineParrent';

import ImplementationTableParent from './implementation-table/ImplementationTableParent';
import SummaryAccessoriesParent from './accessories/SummaryAccessoriesParent';
import SummaryMachineParent from './machine/SummaryMachineParent';
import SummaryNewMachineParent from './newMachine/SummaryNewMachineParent';
import StatusDeliveryParent from './oldMachine copy/StatusDeliveryParent';
import SummaryOldMachineParent from './oldMachine/SummaryOldMachineParent';
import SummaryPreStagingParent from './preStaging/SummaryPreStagingParent';
import SummaryUpsParent from './ups/SummaryUpsParent';
import SummaryWarehouseParent from './warehouse/SummaryWarehouseParent';
import WarehouseTransperParent from './warehouseTransper/WarehouseTransperParent';
import SummaryDurationStaging from './durationStagingSummary/SummaryDurationStagingParent';
import SummaryDeliveryRequestParent from './deliveryRequest/SummaryDeliveryRequestParent';
import SummaryDevelopmentParent from './developmentSummary/SummaryDevelopmentParent';
import DurationReportSummaryParent from './durationReportSummary/DurationReportSummaryParent';

const SummaryConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/summary/newMachine',
      element: <SummaryNewMachineParent />,
    },
    {
      path: 'apps/summary/oldMachine',
      element: <SummaryOldMachineParent />,
    },
    {
      path: 'apps/summary/statusDelivery',
      element: <StatusDeliveryParent />,
    },
    {
      path: 'apps/summary/warehouseTransper',
      element: <WarehouseTransperParent />,
    },
    {
      path: 'apps/summary/preStaging',
      element: <SummaryPreStagingParent />,
    },
    {
      path: 'apps/summary/durationStagingSummary',
      element: <SummaryDurationStaging />,
    },
    {
      path: 'apps/summary/DurationReportSummary',
      element: <DurationReportSummaryParent />,
    },
    {
      path: 'apps/summary/warehouse',
      element: <SummaryWarehouseParent />,
    },
    {
      path: 'apps/summary/ups',
      element: <SummaryUpsParent />,
    },
    {
      path: 'apps/summary/machine',
      element: <SummaryMachineParent />,
    },
    {
      path: 'apps/summary/implementationTable',
      element: <ImplementationTableParent />,
    },
    {
      path: 'apps/summary/accessories',
      element: <SummaryAccessoriesParent />,
    },
    {
      path: 'apps/summary/developmentSummary',
      element: <SummaryDevelopmentParent />,
    },
    {
      path: 'apps/summary/deliveryRequest',
      element: <SummaryDeliveryRequestParent />,
    },
  ],
};

export default SummaryConfig;
