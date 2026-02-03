/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// eslint-disable-next-line import/no-named-as-default
// import PercentageProgress from './PercentageProgress';
import Project from '../TabContent/Project';
import PurchaseOrder from '../TabContent/PurchaseOrder';
import Customer from '../TabContent/Customer';
import Implementation from '../TabContent/Implementation';
import Delivery from '../TabContent/Delivery';
import Received from '../TabContent/Received';
// import TableIplementasi from '../implementation/iplementasiSummary/TableIplementasi';
// import SnMachine from '../TabContent/SNMachine';

// import FusePageCarded from '@fuse/core/FusePageCarded';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box 
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className='flex justify-between'
        >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Project" {...a11yProps(0)} />
          <Tab label="Purchase Order" {...a11yProps(1)} />
          <Tab label="Customer" {...a11yProps(2)} />
          <Tab label="Implementation" {...a11yProps(3)} />
          {/* <Tab label="Delivery" {...a11yProps(4)} />
          <Tab label="Received" {...a11yProps(5)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <Project />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <PurchaseOrder />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Customer />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Implementation />
      </TabPanel>
      {/* <TabPanel value={value} index={4}>
        <Delivery />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Received />
      </TabPanel> */}
    </Box>
  );
}
