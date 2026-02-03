/* eslint-disable import/no-mutable-exports */
import BatchParent from './batch/pages/BatchParent';
import BrandParent from './brand/pages/BrandParent';
import CustomerParent from './customer/pages/CustomerParent';
import RegistMachineParent from './machine/pages/MachineParent';
import ModelParent from './model/pages/ModelParent';
import RegistPOParent from './purchase-order/pages/RegistPOParent';
import StagingPicParent from './stagingPic/pages/StagingPicParent';
import WarehouseParent from './warehouse/pages/WarehouseParent';
import PartNumber from './partNumber/PartNumber';
import PoMaster from './poMaster/PoMaster';
import PicMover from './picMover/PicMover';
import SettingPreStaging from './settingPreStaging/SettingPreStaging';
import MachineSpesification from './machineSpesification/MachineSpesification';
import UserManagenetsParents from './userManagements/UserManagenetsParents';
import StagingTSSParent from './picTSS/stagingPic/pages/StagingPicParent';
import StyleParent from './style/StyleParent';
import DetailSpesificationParent from './detailSpesification/DetailSpesificationParent';
import StatusPoParent from './statusPo/pages/StatusPoParent';
import PreloadingParent from './Templatepreloading/PreloadingParent';
import PrestagingParent from './templatelPreStaging/PrestagingParent';

const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}

let RegistrationConfig = {};

if (userRoles === 'SUPER_ADMIN' || userRoles === 'ADMIN' || userRoles === 'SUPERVISOR') {
  RegistrationConfig = {
    settings: {
      layout: {},
    },
    routes: [
      {
        path: 'apps/registration/stagingPic',
        element: <StagingPicParent />,
      },
      {
        path: 'apps/registration/brand',
        element: <BrandParent />,
      },
      {
        path: 'apps/registration/batch',
        element: <BatchParent />,
      },
      {
        path: 'apps/registration/customer',
        element: <CustomerParent />,
      },
      {
        path: '/apps/registration/warehouse',
        element: <WarehouseParent />,
      },
      {
        path: '/apps/registration/machine',
        element: <RegistMachineParent />,
      },
      {
        path: '/apps/registration/model',
        element: <ModelParent />,
      },
      {
        path: '/apps/registration/purchaseOrder',
        element: <RegistPOParent />,
      },
      {
        path: '/apps/registration/purchaseOrder2',
        element: <PoMaster />,
      },
      {
        path: '/apps/registration/partNumber',
        element: <PartNumber />,
      },
      {
        path: '/apps/registration/picMover',
        element: <PicMover />,
      },
      {
        path: 'apps/registration/picTSS',
        element: <StagingTSSParent />,
      },
      {
        path: '/apps/registration/settingPreStaging',
        element: <SettingPreStaging />,
      },
      {
        path: '/apps/registration/machineSpesification',
        element: <MachineSpesification />,
      },
      {
        path: '/apps/registration/detailSpesification',
        element: <DetailSpesificationParent />,
      },
      {
        path: 'apps/registration/management',
        element: <UserManagenetsParents />,
      },
      {
        path: 'apps/registration/style',
        element: <StyleParent />,
      },
      {
        path: 'apps/registration/statusPo',
        element: <StatusPoParent />,
      },
      {
        path: 'apps/registration/preloading',
        element: <PreloadingParent />,
      },
      {
        path: 'apps/registration/prestaging',
        element: <PrestagingParent />,
      },
    ],
  };
} else {
  RegistrationConfig = {
    settings: {
      layout: {},
    },
    routes: [],
  };
}

export default RegistrationConfig;
