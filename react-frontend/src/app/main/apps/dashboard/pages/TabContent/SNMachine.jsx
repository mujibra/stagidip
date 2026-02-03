/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { Card, Typography } from '@mui/material';
import { CardChartDummy } from '../chartComponent/CardChartDummy';
import DonutChartDummy from '../chartComponent/DonutChartDummy';
import VerticalBarChart from '../chartComponent/VerticalBarChart';

/* eslint-disable import/prefer-default-export */
export const SnMachine = () => {
  return (
    <div>
      {/* <div className="w-full flex gap-10 flex-col mb-20 md:flex-row">
        <Card className="gap-20 ml-10 mr-10 mt-20 md:basis-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Total Active SN</b>
          </Typography>
          <center>
            <CardChartDummy />
          </center>
        </Card>
        <Card className="gap-20 ml-10 mr-10 mt-20 w-1/2">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>SN Status</b>
          </Typography>
          <center>
            <DonutChartDummy />
          </center>
        </Card>
      </div> */}
      
      <div className="w-full flex mb-20">
        <Card className="mt-20 w-full">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Total SN Machine</b>
          </Typography>
          <center className="pt-10 pb-20 px-10">
            <CardChartDummy />
          </center>
        </Card>
      </div>
     
      <div className="w-full flex mb-20">
        <Card className="mt-20 w-full">
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Most Machine Location</b>
          </Typography>
          <center>
            <VerticalBarChart />
          </center>
        </Card>
      </div>
    </div>
  );
};

export default SnMachine;
