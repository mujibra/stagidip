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
import { HandleFilter } from './action/HandleFilter';
import HandleExportExcel from './action/HandleExportExcel';
import TableSummaryDurationStaging from './TableSummaryDurationStaging';
// import  HandleExportExcel  from './action/HandleExportExcel';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));
// const navigate = useNavigate();

const SummaryDurationStagingParent = props => {
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

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then(res => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
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
        .get(
          `${api}getTimeDurationSummary/${
            datefrom === null ? null : moment(datefrom).format('YYYY-MM-DD')
          }/${dateTo === null ? null : moment(dateTo).format('YYYY-MM-DD')}/${
            id_po?.id_po === undefined ? null : id_po?.id_po
          }
          `,
          config
        )
        .then(res => {
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
        .catch(err => {
          setData([]);
          setLoading(false);
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
          console.log(err);
        });
    }
    return () => {
      isUnmout = true;
    };
  }, [
    id_po?.id_po,
    customer,
    nama_gudang,
    model,
    id_type_mesin,
    datefrom,
    dateTo,
  ]);
  // console.log(body, 'bodyyyyyyy');
  // console.log(model);

  function createData(
    no_mesin,
    no_po,
    pn_system,
    sn_mesin,
    sn_batch,
    batch,
    type,
    model,
    time_specification,
    time_staging,
    time_prestaging,
    time_preloading,
    total_duration
  ) {
    return {
      no_mesin,
      no_po,
      pn_system,
      sn_mesin,
      sn_batch,
      batch,
      type,
      model,
      time_specification,
      time_staging,
      time_prestaging,
      time_preloading,
      total_duration,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      // item?.no_mesin,
      item?.no_po,
      item?.pn_system,
      item?.sn_mesin,
      item?.sn_batch,
      item?.batch,
      item?.type,
      item?.model,
      item?.time_specification === null ? '-' : item?.time_specification,
      item?.time_staging === null ? '-' : item?.time_staging,
      item?.time_prestaging === null ? '-' : item?.time_prestaging,
      item?.time_preloading === null ? '-' : item?.time_preloading,
      item?.total_duration === null ? '-' : item?.total_duration
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
    doc.text(
      `List Duration Staging Summary Tanggal ${moment().format('LL')}`,
      20,
      20
    );
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
          'No PO',
          'PN System',
          'SN Mesin',
          'SN Batch',
          'Batch',
          'Type',
          'Model',
          'Specification',
          'Staging',
          'Prestaging',
          'Preloading',
          'Total',
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
                  <Typography
                    className="flex items-left mt-20 sm:mb-12 flex-col"
                    color="inherit"
                  >
                    <Typography
                      className=" sm:flex mx-0 sm:mx-12 text-xl"
                      variant="h3"
                    >
                      Duration Staging Summary
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        leftSidebarContent={
          <HandleFilter
            getAccessToken={getAccessToken}
            body={body}
            setBody={setBody}
            data={data}
            getUser={getUser}
          />
        }
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
                        <HandleExportExcel
                          datas={datas}
                          listPO={id_po}
                          sumTotal={sumTotal}
                        />
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
                <TableSummaryDurationStaging
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

export default SummaryDurationStagingParent;
