/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import dummyMonitorPerformance from 'app/mockData/dummyMonitorPerformance';
import BarHorzontalDummy from '../chartComponent/BarHorizontalDummy';
import { CardChartDummy } from '../chartComponent/CardChartDummy';
import DonutChartDummy from '../chartComponent/DonutChartDummy';
// import ProgressPercentageBarChart from '../chartComponent/ProgressPercentageBarChart';
// import DeliveryAnalysistLinechart from '../chartComponent/DeliveryAnalysistLinechart';
// import DonutChartDummy from '../chartComponent/DonutChartDummy';
// import HorizontalBarChart from '../chartComponent/HorizontalBarChart';
import ListChartDummy from '../chartComponent/ListChartDummy';
import PoRanking from '../chartComponent/PoRanking';
import VerticalBarChart from '../chartComponent/VerticalBarChart';
import MesinPerWarehouse from '../implementation/purchase-order/MesinPerWarehouse';
import TotalMesinByPo from '../implementation/purchase-order/TotalMesinByPo';
import Top3Customer from '../implementation/purchase-order/Top3Customer';
import ActiveMachine from '../implementation/purchase-order/ActiveMachine';
import Top3CustomerFilter from '../filterComponent/Top3CustomerFilter';

/* eslint-disable import/prefer-default-export */
export const PurchaseOrder = () => {
  const [yearCustomer, setYearCustomer] = useState('');

  return (
    <div>
      {/* <div className="w-full flex gap-10 flex-col mb-20 md:flex-row">
        <Card className="gap-20 ml-10 mr-10 mt-20 w-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Top 3 Customer Purchase</b>
          </Typography>
          <center>
            <Top3Customer />
          </center>
        </Card>
        <Card className="gap-20 ml-10 mr-10 mt-20 md:basis-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Active Machine by Customer</b>
          </Typography>
          <center>
            <ActiveMachine />
          </center>
        </Card>
      </div> */}

      {/* <div className="w-full flex mb-20">
        <Card className="mt-20 w-full">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Total Machine By Purchase Order</b>
          </Typography>
          <center>
            <TotalMesinByPo />
          </center>
        </Card>
      </div> */}

      <div className="w-full flex mb-20">
        <Card className="mt-20 w-full">
          <div className='flex justify-between'>
            <Typography className="m-20 text-17" color="textSecondary">
              <b>Top 3 Customer Purchase</b>
            </Typography>
            <Top3CustomerFilter
              year={yearCustomer}
              setYear={setYearCustomer}
            />
          </div>
          <center>
            <Top3Customer 
              year={yearCustomer}
            />
          </center>
        </Card>
      </div>

      <div className="w-full flex mb-20">
        <Card className="mt-20 w-full">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Machine Per Warehouse</b>
          </Typography>
          <center>
            <MesinPerWarehouse />
          </center>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseOrder;
