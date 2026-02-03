import { Card, Typography } from '@mui/material';
import ProgressPercentageBarChart from '../chartComponent/ProgressPercentageBarChart';
import DeliveryAnalysistLinechart from '../chartComponent/DeliveryAnalysistLinechart';

/* eslint-disable import/prefer-default-export */
export const PercentageProgress = () => {
  return (
    <div>
      <div className="w-full flex gap-10 flex-col mb-20 md:flex-row">
        <Card className="gap-20 ml-20 mr-10 mt-20 md:basis-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Project Percentage Progress</b>
          </Typography>
          <center>
            <ProgressPercentageBarChart />
          </center>
        </Card>
        <Card className="gap-20 ml-10 mr-20 mt-20 md:basis-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Delivery Analysist</b>
          </Typography>
          <center>
            <DeliveryAnalysistLinechart />
          </center>
        </Card>
      </div>
    </div>
  );
};

export default PercentageProgress;
