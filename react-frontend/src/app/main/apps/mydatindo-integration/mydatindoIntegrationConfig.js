import MyDatindoIntegrationPage from './pages/MyDatindoIntegrationPage';
// import { MydatindoIntegrationParrent } from './pages/MydatindoIntegrationParrent';

const myDatindoIntergrationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/myDatindoIntergration',
      // element: <MydatindoIntegrationParrent />,
      element: <MyDatindoIntegrationPage />,
    },
  ],
};

export default myDatindoIntergrationConfig;
