/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { DemandGoodsCard } from './DemandGoodsCard';
import { DemandGoodsBox } from './DemandGoodsBox';

/* eslint-disable import/prefer-default-export */
export const DemandGoods = (props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="w-full rounded-20 shadow flex flex-col justify-between">
        <Typography className="m-20 text-17" color="textSecondary">
          <Typography className="h3 sm:h2 font-medium">DemandGoods</Typography>
        </Typography>
        <div className="">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons={false}
                  // centered
                  className="w-full px-24 -mx-4 min-h-40 "
                  classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
                  TabIndicatorProps={{
                    children: (
                      <Box
                        sx={{ bgcolor: 'text.disabled' }}
                        // className="w-full h-full rounded-full opacity-20"
                      />
                    ),
                  }}
                >
                  <Tab
                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 capitalize"
                    label="Item One"
                    value="1"
                    disableRipple
                  />
                  <Tab
                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 capitalize"
                    label="Item Two"
                    value="2"
                    disableRipple
                  />
                </TabList>
              </Box>
              <div className="">
                <TabPanel className="" value="1">
                  <div className="md:w-full h-full ">
                    <DemandGoodsCard />
                  </div>
                  <div className="md:w-full">
                    <DemandGoodsBox data={props.data} />
                  </div>
                </TabPanel>
                <TabPanel className=" " value="2">
                  <div className="md:w-full h-full ">
                    <DemandGoodsCard />
                  </div>
                  <div className="md:w-full">
                    <DemandGoodsBox data={props.data} />
                  </div>
                </TabPanel>
              </div>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DemandGoods;
