import dasboardConfig from './dashboard/dashboardConfig';
import porchaseOderConfig from './porchase-order/porchaseOderConfig';
import myDatindoIntergrationConfig from './mydatindo-integration/mydatindoIntegrationConfig';
import RegistrationConfig from './registration/RegistrationConfig';
import OldMachineConfig from './stagging/oldMachine/oldMachineAppConfig';
import WarehouseTransferConfig from './warehouse-transfer/WarehouseTransferConfig';
import NewMachineAppConfig from './stagging/newMachine/NewMachineAppConfig';
import ViewStagingConfig from './stagging/viewStagging/ViewStagingConfig';
import InspeksiConfig from './stagging/inspeksiTesting/InspeksiConfig';
import StatusDeliveryConfig from './status-delivery/statusDeliveryAppConfig';
import CheklistStagingConfig from './preStaging/CheklistStagingConfig';
import SummaryConfig from './summary/SummaryConfig';
import SpesificationConfig from './spesification/SpesificationConfig';

const appConfig = [
  dasboardConfig,
  porchaseOderConfig,
  SummaryConfig,
  // deliveryStatusConfig,
  myDatindoIntergrationConfig,
  SpesificationConfig,
  RegistrationConfig,
  OldMachineConfig,
  WarehouseTransferConfig,
  NewMachineAppConfig,
  ViewStagingConfig,
  InspeksiConfig,
  StatusDeliveryConfig,
  CheklistStagingConfig,
];

export default appConfig;
