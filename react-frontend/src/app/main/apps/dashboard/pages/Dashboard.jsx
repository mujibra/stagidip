/* eslint-disable camelcase */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */

// import dummyMonitorPerformance from 'app/mockData/dummyMonitorPerformance';
import {
  // Card,
  Typography,
} from '@mui/material';
// import dummyDemanGoodBoxs from 'app/mockData/dummyDemanGoodBoxs';
// import DemandGoods from './dashboardComponent/DemandGoods';
// eslint-disable-next-line import/no-named-as-default
// import { MonitorPerformere } from './dashboardComponent/MonitorPerformere';
// import PercentageProgress from './dashboardComponent/PercentageProgress';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import TabComponent from './dashboardComponent/TabComponent';

export const Dashboard = () => {
  const get_info_user = localStorage.getItem('user_profile');

  // console.log('ceekInfoUser', get_info_user?.name);c

  return (
    <div>
      {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1>Inventory Management System</h1>
        <p>Monitor and Review Performance Report</p>
      </div>
      <div></div> */}
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={
          <div>
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      <h1>
                        <b>StagiDIP</b>
                      </h1>
                    </Typography>
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xs" variant="h5">
                      Monitor and Review Performance Report
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <TabComponent />
              {/* <div>
                <MonitorPerformere dummyMonitorPerformance={dummyMonitorPerformance} />
              </div> */}
              {/* <Card className="gap-20 ml-20 mr-20 mt-20">
                <DemandGoods data={dummyDemanGoodBoxs} />
              </Card> */}
              {/* <div>
                <PercentageProgress />
              </div> */}
            </div>
          </FuseAnimate>
        }
      />
    </div>
  );
};
