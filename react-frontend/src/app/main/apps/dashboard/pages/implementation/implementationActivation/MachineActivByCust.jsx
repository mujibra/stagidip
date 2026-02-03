/* eslint-disable radix */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

// import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import Chart from 'react-apexcharts';
import { filter } from 'lodash';
import { Card, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import ColorsForData from '../../../ColorsForData';
import MachineActivationFilter from '../../filterComponent/MachineActivationFilter';
// import { Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));

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
// const navigate = useNavigate();

const MachineActivByCust = (props) => {
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDataPercent, setSelectedDataPercent] = useState(null);
  const [showPercent, setShowPercent] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${api}getMachineActivationByCustomer`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
          params: {
            month: month,
            year: year,
          },
        }
      )
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res?.data?.data, 'datas');
        // ada field persentase
      })
      .catch((err) => {
        setData([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getData()
  }, [month, year]);

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const dataLabel = data?.map((item) => item?.bank_desc);
  const TotalActivated = data?.map((item) => item?.total_activated);
  const dataTotalActivated = TotalActivated?.map((item) => {
    return item === null || item === '0' || item === undefined ? 0 : parseInt(item);
  });
  // let sum = 0;
  // eslint-disable-next-line no-return-assign
  const totalMesin = dataTotalActivated.reduce((acc, curr) => acc + curr, 0);
  // console.log(filteredData, 'data');
  // console.log(dataLabel, 'dataLabel');
  // console.log(dataTotalActivated, 'dataTotalActivated');
  // console.log(totalMesin, 'totalMesin');

  // Handle data point selection
  const handleDataPointSelection = (event, chartContext, configKlik) => {
    const selectedDataIndex = configKlik.dataPointIndex;
    const selectedDataValue = dataTotalActivated[selectedDataIndex];
    const selectedLabel = dataLabel[selectedDataIndex];
    const selectedPercentage = ((selectedDataValue / totalMesin) * 100).toFixed(2);

    const detailInfo = {
      label: selectedLabel,
      value: selectedDataValue,
      percentage: selectedPercentage,
    };

    setSelectedData(detailInfo);
  };

  const handleDataPointSelectionPercent = (event, chartContext, configKlik) => {
    const selectedDataIndex = configKlik.dataPointIndex;
    const selectedDataValue = dataTotalActivated[selectedDataIndex];
    const selectedLabel = dataLabel[selectedDataIndex];
    const selectedPercentage = ((selectedDataValue / totalMesin) * 100).toFixed(2);

    const detailInfoPercent = {
      label: selectedLabel,
      value: selectedDataValue,
      percentage: selectedPercentage,
    };

    setSelectedDataPercent(detailInfoPercent);
  };

  const state = {
    series: dataTotalActivated?.length !== 0 ? dataTotalActivated : [],
    options: {
      chart: {
        type: 'donut',
        events: {
          dataPointSelection: handleDataPointSelection,
        },
      },
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
        formatter:
          !showPercent &&
          function (val) {
            return ((val * totalMesin) / 100).toFixed(0);
          },
      },
      labels: dataLabel?.length !== 0 ? dataLabel : [],
      colors: ColorsForData,
    },
  };

  const statePercent = {
    series: dataTotalActivated?.length !== 0 ? dataTotalActivated : [],
    options: {
      chart: {
        type: 'donut',
        events: {
          dataPointSelection: handleDataPointSelectionPercent,
        },
      },
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
      },
      labels: dataLabel?.length !== 0 ? dataLabel : [],
      colors: ColorsForData,
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedData(null);
    setSelectedDataPercent(null);
  };

  return (
    <div className="w-full flex gap-10 flex-col mb-20">
      <Card className="gap-20 ml-10 mr-10 mt-20">
        <div className='flex justify-between'>
          <Typography className="m-20 text-17" color="textSecondary">
            <b>Machine Activation by Customer</b>
          </Typography>
          <MachineActivationFilter
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Percentage" {...a11yProps(0)} />
              <Tab label="Real Number" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <div>
                {selectedDataPercent !== null && (
                  <div className="px-10 py-4 text-xs md:text-sm">
                    <p>
                      Customer:{' '}
                      <span className="ml-10 font-semibold">{selectedDataPercent.label}</span>
                    </p>
                    <p>
                      Machine activated:{' '}
                      <span className="ml-10 font-semibold">{selectedDataPercent.value}</span>
                    </p>
                    <p>
                      Percentage:{' '}
                      <span className="ml-10 font-semibold">{selectedDataPercent.percentage}%</span>
                    </p>
                  </div>
                )}
              </div>
              <center>
                <div className="">
                  <div className="text-sm pb-10">
                    <Chart
                      options={statePercent.options}
                      series={statePercent.series}
                      type="donut"
                      width="80%"
                      height="400"
                      noData={{
                        text: 'No data available',
                        align: 'center',
                        verticalAlign: 'middle',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                          fontSize: '14px',
                          color: '#000',
                        },
                      }}
                    />
                  </div>
                </div>
              </center>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <div>
                {selectedData !== null && (
                  <div className="px-10 py-4 text-xs md:text-sm">
                    <p>
                      Customer: <span className="ml-10 font-semibold">{selectedData.label}</span>
                    </p>
                    <p>
                      Machine activated:{' '}
                      <span className="ml-10 font-semibold">{selectedData.value}</span>
                    </p>
                    <p>
                      Percentage:{' '}
                      <span className="ml-10 font-semibold">{selectedData.percentage}%</span>
                    </p>
                  </div>
                )}
              </div>
              <center>
                <div className="">
                  <div className="text-sm pb-10">
                    <Chart
                      options={state.options}
                      series={state.series}
                      type="donut"
                      width="80%"
                      height="400"
                      noData={{
                        text: 'No data available',
                        align: 'center',
                        verticalAlign: 'middle',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                          fontSize: '14px',
                          color: '#000',
                        },
                      }}
                    />
                  </div>
                </div>
              </center>
            </div>
          </TabPanel>
        </Box>
      </Card>
    </div>
  );
};

export default MachineActivByCust;
