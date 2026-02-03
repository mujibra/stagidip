/* eslint-disable no-self-compare */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

import { Button, Typography } from '@mui/material';
// import FileOpenIcon from '@mui/icons-material/FileOpen';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { showMessage } from 'app/store/fuse/messageSlice';
import HandleExportExcel from './action/HandleExportExcel';
import TableSummaryReportDuration from './TableSummaryReportDuration';
// import  HandleExportExcel  from './action/HandleExportExcel';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));
// const navigate = useNavigate();

const DurationReportSummaryParent = (props) => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  const dispatch = useDispatch();
  // const formatDate = moment().format('YYYY-DD-MM');
  const formatDate = 'YYYY-MM-DD HH:mm:ss';
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const [open, setOpen] = useState(false);

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // setOpen(true);

  const [data, setData] = useState([]);
  // console.log(data, 'data duration');
  const [sumTotal, setsumTotal] = useState(0);
  const [id_po, setid_po] = useState('');
  // console.log(id_po, 'idpoooo');
  const [customer, setcustomer] = useState('');
  const [datefrom, setDatefrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [model, setmodel] = useState('');
  const [id_type_mesin, setid_type_mesin] = useState('');
  const [nama_gudang, setnama_gudang] = useState('');
  // console.log(id_po);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const body = {
    id_po,
    customer,
    model,
    nama_gudang,
    id_type_mesin,
    datefrom,
    dateTo,
  };
  const setBody = {
    setid_po,
    setmodel,
    setnama_gudang,
    setid_type_mesin,
    setcustomer,
    setDatefrom,
    setDateTo,
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(`${api}getStaginDurationReportV2/`, config)
        // .get(`${api}getStaginDurationReport/`, config)
        .then((res) => {
          setData(res?.data?.datas);
          // console.log(res, 'ress');
          setsumTotal(
            (res?.data?.datas).reduce(
              (time_preloading, obj) => time_preloading + +obj?.time_prestaging,
              0
            )
          );
          setLoading(false);
          // console.log(res.data);
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
          const errStatus = err?.response?.status;
          const errMessage = err?.response?.data?.message;
          let messages = '';
          if (errStatus === 401) {
            messages = 'Unauthorized!!';
            window.location.href = '/login';
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
          console.log(err);
        });
    }
    return () => {
      isUnmout = true;
    };
  }, [id_po?.id_po, customer, nama_gudang, model, id_type_mesin, datefrom, dateTo]);
  // console.log(body, 'bodyyyyyyy');
  // console.log(model);

  function createData(
    no,
    customer,
    types,
    models,
    total_avg_specification,
    total_avg_staging,
    total_avg_checklist,
    total_avg_preload,
    total_avg
  ) {
    return {
      no,
      customer,
      types,
      models,
      total_avg_specification,
      total_avg_staging,
      total_avg_checklist,
      total_avg_preload,
      total_avg,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.customer,
      item?.types,
      item?.models,
      item?.total_avg_specification,
      item?.total_avg_staging,
      item?.total_avg_checklist,
      item?.total_avg_preload,
      item?.total_avg
    )
  );
  const DataForBody = [];

  for (let index = 0; index < datas.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`List Of Duration Staging Summary ${moment().format('LL')}`, 20, 20);
    doc.setFontSize(10);
    // doc.text(
    //   `Sum Total  : ${
    //     sumTotal === null || '' || undefined || NaN ? '-' : sumTotal
    //   }`,
    //   20,
    //   40
    // );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 50 },
      head: [
        [
          'N0',
          'Customer',
          'Type',
          'Model',
          'Spesification Average',
          'Staging Average',
          'Pre Staging Average',
          'Pre Loading Average',
          'Total Averange',
        ],
      ],
      headStyles: { fontSize: 7, halign: 'center' },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
        6: { fontSize: 7, halign: 'center' },
        7: { fontSize: 7, halign: 'center' },
        8: { fontSize: 7, halign: 'center' },
        9: { fontSize: 7, halign: 'center' },
        10: { fontSize: 7, halign: 'center' },
        11: { fontSize: 7, halign: 'center' },
        12: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Download Duration Staging Summary${moment().format('LL')}.pdf`);
  };
  const objData = {
    customer: null,
    type: null,
    model: null,
    specAvg: null,
    stagingAVG: null,
    preStagingAVG: null,
    preLoadingAVG: null,
    totalMesin: null,
  };
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const bank = [];
    const bankAallSum = [];
    const allSum = {
      sumSpec: [],
      sumStaging: [],
      sumPreStaging: [],
      sumPreLoading: [],
    };
    // const sumSpec = [];
    // const sumStaging = [];
    // const sumPreStaging = [];

    // if (data?.length !== 0) {
    //   for (let index = 0; index < data.length; index++) {
    //     for (let idx = 0; idx < data[index]?.detail_po?.length; idx++) {
    //       for (let i = 0; i < data[index]?.detail_po[idx]?.length; i++) {
    //         bank.push({
    //           ...objData,
    //           customer: data[index]?.customer_name,
    //           totalMesin: data[index]?.detail_po[idx][i]?.detail_po?.jml_mesin,
    //           type: data[index]?.detail_po[idx][i]?.types,
    //           model: data[index]?.detail_po[idx][i]?.models,
    //           specAvg: data[index]?.detail_po[idx][i]?.subtotal_time_specification,
    //           stagingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_staging,
    //           preStagingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_checklist,
    //           preLoadingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_preloading,
    //         });
    //         const timeSpec = moment(
    //           data[index]?.detail_po[idx][i]?.subtotal_time_specification === null
    //             ? 0
    //             : data[index]?.detail_po[idx][i]?.subtotal_time_specification,
    //           'hh:mm:ss'
    //         );
    //         const timeStaging = moment(
    //           data[index]?.detail_po[idx][i]?.subtotal_time_staging === null
    //             ? 0
    //             : data[index]?.detail_po[idx][i]?.subtotal_time_staging,
    //           'hh:mm:ss'
    //         );
    //         const timePreStaging = moment(
    //           data[index]?.detail_po[idx][i]?.subtotal_time_checklist === null
    //             ? 0
    //             : data[index]?.detail_po[idx][i]?.subtotal_time_checklist,
    //           'hh:mm:ss'
    //         );
    //         const timePreloading = moment(
    //           data[index]?.detail_po[idx][i]?.subtotal_time_preloading === null
    //             ? 0
    //             : data[index]?.detail_po[idx][i]?.subtotal_time_preloading,
    //           'hh:mm:ss'
    //         );
    //         bankAallSum.push({
    //           ...allSum,
    //           sumSpec: allSum?.sumSpec.push(timeSpec.diff(moment().startOf('day'), 'seconds')),
    //           sumStaging: allSum?.sumStaging.push(
    //             timeStaging.diff(moment().startOf('day'), 'seconds')
    //           ),
    //           sumPreStaging: allSum?.sumPreStaging.push(
    //             timePreStaging.diff(moment().startOf('day'), 'seconds')
    //           ),
    //           sumPreLoading: allSum?.sumPreLoading.push(
    //             timePreloading.diff(moment().startOf('day'), 'seconds')
    //           ),
    //         });
    //       }
    //     }
    //   }
    //   if (bank.length !== 0) {
    //     const result = bank.reduce((x, y) => {
    //       (x[y.customer] = x[y.customer] || []).push(y);

    //       return x;
    //     }, {});

    //     console.log(result);
    //   }
    // }

    // if (data?.length !== 0) {
    //   for (let index = 0; index < data.length; index++) {
    //     for (let idx = 0; idx < data[index]?.detail_po?.length; idx++) {
    //       for (let i = 0; i < data[index]?.detail_po[idx]?.length; i++) {
    //         bank.push({
    //           ...objData,
    //           customer: data[index]?.customer,
    //           totalMesin: data[index]?.detail_po[idx][i]?.detail_po?.jml_mesin,
    //           type: data[index]?.types,
    //           model: data[index]?.models,
    //           specAvg: data[index]?.detail_po[idx][i]?.subtotal_time_specification,
    //           stagingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_staging,
    //           preStagingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_checklist,
    //           preLoadingAVG: data[index]?.detail_po[idx][i]?.subtotal_time_preloading,
    //         });
    //       }
    //     }
    //   }
    // }
    setGetData(bank);
    // if (allSum.sumPreLoading.length !== 0 || bank.length !== 0) {
    //   console.log(allSum, 'allSum');
    // }
  }, [data]);

  return (
    <div>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={
          <div>
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex my-10 items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      Duration Staging Summary
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        // leftSidebarContent={
        //   <HandleFilter
        //     getAccessToken={getAccessToken}
        //     body={body}
        //     setBody={setBody}
        //     data={data}
        //     getUser={getUser}
        //   />
        // }
        contentToolbar={
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-ful flex-col md:flex-row md:items-center md:mt-0">
              {userRoles !== 'GUEST_RELATED' && (
                <div className="flex custom-lg:mx-4 w-full">
                  <div className="flex ">
                    <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                      <Button variant="contained" onClick={downloadPDF}>
                        <PictureAsPdfIcon className="mr-2" />
                        <div className="hidden md:contents">Export PDF</div>
                      </Button>
                    </FuseAnimate>
                  </div>
                  <div>
                    <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                      <div className="ml-10">
                        <HandleExportExcel datas={datas} listPO={id_po} sumTotal={sumTotal} />
                      </div>
                    </FuseAnimate>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TableSummaryReportDuration
                  userRoles={userRoles}
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  sumTotal={sumTotal}
                  // getData={getData}
                  handleClose={handleClose}
                />
              </div>
            </div>
          </FuseAnimate>
        }
        // innerScroll
      />
    </div>
  );
};

export default DurationReportSummaryParent;
