/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
// import dummyMonitorPerformance from 'app/mockData/dummyMonitorPerformance';
// import BarHorzontalDummy from '../chartComponent/BarHorizontalDummy';
// import { CardChartDummy } from '../chartComponent/CardChartDummy';
// import ProgressPercentageBarChart from '../chartComponent/ProgressPercentageBarChart';
// import DeliveryAnalysistLinechart from '../chartComponent/DeliveryAnalysistLinechart';
// import DonutChartDummy from '../chartComponent/DonutChartDummy';
// import HorizontalBarChart from '../chartComponent/HorizontalBarChart';
// import ListChartDummy from '../chartComponent/ListChartDummy';
import MesinStatus from '../implementation/project/MasinStatus';
import ProjectStatus from '../implementation/project/ProjectStatus';
import MachineInstalledFIlter from '../filterComponent/MachineStatusFilter';
import MachineStatusFilter from '../filterComponent/MachineStatusFilter';

/* eslint-disable import/prefer-default-export */
export const Project = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [monthInstalled, setMonthInstalled] = useState('');
  const [yearInstalled, setYearInstalled] = useState('');

  return (
    <div>
      <div className="w-full flex gap-10 flex-col mb-20">
        <Card className="gap-20 ml-10 mr-10 mt-20">
          <div className='flex justify-between'>
            <Typography className="m-20 text-17" color="textSecondary">
              <b>Machine Status</b>
            </Typography>
            <MachineStatusFilter
              idFilter='machine_status'
              month={month}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
            />
          </div>
          <center>
            <MesinStatus
              month={month}
              year={year}
            />
          </center>
        </Card>
      </div>
      
      <div className="w-full flex gap-10 flex-col mb-20">
        <Card className="gap-20 ml-10 mr-10 mt-20">
          <div className='flex justify-between'>
            <Typography className="m-20 text-17" color="textSecondary">
              <b>Machine Installed</b>
            </Typography>
            <MachineInstalledFIlter
              month={monthInstalled}
              setMonth={setMonthInstalled}
              year={yearInstalled}
              setYear={setYearInstalled}
            />
          </div>
          <ProjectStatus 
            month={monthInstalled}
            year={yearInstalled}
          />
        </Card>
      </div>
    </div>
  );
};

export default Project;
