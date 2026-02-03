/* eslint-disable no-nested-ternary */
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
import Divider from '@mui/material/Divider';
import { HandleFilter } from './action/HandleFilter';
import TableSummaryMachine from './TableSummaryMachine';
import HandleExportExcel from './action/HandleExportExcel';
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

const SummaryMachineParent = (props) => {
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
  const [detail, setDetail] = useState([]);
  // console.log(detail, 'detailllllll');
  // console.log(data, 'data machine');
  const [id_po, setid_po] = useState('');
  const [customer, setcustomer] = useState('');
  const [batch, setbatch] = useState('');
  const [model, setmodel] = useState('');
  const [id_type_mesin, setid_type_mesin] = useState('');
  const [nama_gudang, setnama_gudang] = useState('');
  const [tgl_tiba, settgl_tiba] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [order, setOrder] = useState('');
  // console.log(order, 'orderrrrr');
  const [orderBy, setOrderBy] = useState('');
  // console.log(orderBy, 'idddd');

  const propsFromParrentNew = (order, orderBy) => {
    setOrder(order);
    setOrderBy(orderBy);
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

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const body = {
    id_po,
    customer,
    batch,
    tgl_tiba: moment(tgl_tiba).format('YYYY-MM-DD'),
    id_type_mesin,
    model,
  };
  const setBody = {
    setid_po,
    setcustomer,
    setbatch,
    settgl_tiba,
    setid_type_mesin,
    setmodel,
  };
  // console.log(body, 'bodyyyyyyyy');
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(
          `${api}getMachineSummary/${body?.id_po?.id === undefined ? null : body?.id_po?.id}/${
            body?.batch === '' ? null : body?.batch
          }`,
          // `${api}getMachineSummary/null/null`,
          config
        )
        .then((res) => {
          setData(res?.data?.data);
          setDetail(res?.data?.detail_po);
          setLoading(false);
          // console.log(res.data?.data, 'data');
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
          const errStatus = err.response.status;
          const errMessage = err.response.data.message;
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
  }, [body?.id_po?.id, body?.batch]);

  function createData(
    no,
    sn_mesin,
    seri_mesin,
    brand,
    models,
    types,
    no_baris_mesin,
    gudang,
    customer,
    model_by_customer
  ) {
    return {
      no,
      sn_mesin,
      seri_mesin,
      brand,
      models,
      types,
      no_baris_mesin,
      gudang,
      customer,
      model_by_customer,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      item?.sn_mesin === undefined ? '-' : item?.sn_mesin,
      '-',
      item?.brand === undefined ? '-' : item?.brand,
      item?.models === undefined
        ? '-'
        : item?.customer === 'Bank Central Asia'
        ? item?.model_by_customer
        : item?.models,
      item?.customer === 'Bank Central Asia' && item?.types === 'ATMS'
        ? 'ATM'
        : item?.customer === 'Bank Central Asia' && item?.types === 'CRMS'
        ? 'CRM'
        : item?.types,
      item?.no_baris_mesin === '' ||
        item?.no_baris_mesin === undefined ||
        item?.no_baris_mesin === null
        ? '-'
        : item?.no_baris_mesin,
      item?.gudang === '' || item?.gudang === undefined || item?.gudang === null
        ? '-'
        : item?.gudang
    )
  );

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  const datasLoop = stableSort(datas, getComparator(order, orderBy))?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      item?.sn_mesin === undefined ? '-' : item?.sn_mesin,
      '-',
      item?.brand === undefined ? '-' : item?.brand,
      item?.models === undefined
        ? '-'
        : item?.customer === 'Bank Central Asia'
        ? item?.model_by_customer
        : item?.models,
      item?.customer === 'Bank Central Asia' && item?.types === 'ATMS'
        ? 'ATM'
        : item?.customer === 'Bank Central Asia' && item?.types === 'CRMS'
        ? 'CRM'
        : item?.types,
      item?.no_baris_mesin === '' ||
        item?.no_baris_mesin === undefined ||
        item?.no_baris_mesin === null
        ? '-'
        : item?.no_baris_mesin,
      item?.gudang === '' || item?.gudang === undefined || item?.gudang === null
        ? '-'
        : item?.gudang
    )
  );

  const DataForBody = [];

  for (let index = 0; index < datasLoop.length; index++) {
    if (datasLoop.length !== 0) {
      DataForBody.push(Object.values(datasLoop[index]));
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`List Summary Machine on ${moment().format('LL')}`, 20, 20);
    const index = 0;
    doc.setFontSize(10);
    doc.text(
      `No PO  : ${body?.id_po?.no_po_master === undefined ? '-' : body?.id_po?.no_po_master}`,
      20,
      40
    );
    doc.text(
      `Customer : ${detail?.customer?.bank_desc === undefined ? '-' : detail?.customer?.bank_desc}`,
      20,
      55
    );
    doc.text(`Batch : ${detail?.batch?.name === undefined ? '-' : detail?.batch?.name}`, 20, 70);
    doc.text(
      `Tanggal Masuk : ${
        detail?.tgl_masuk === undefined ? '-' : moment(detail?.tgl_masuk).format('LL')
      }`,
      250,
      40
    );
    doc.text(
      `Type : ${
        detail?.customer?.bank_desc === 'Bank Central Asia' && detail?.type?.name === 'ATMS'
          ? 'ATM'
          : detail?.customer?.bank_desc === 'Bank Central Asia' && detail?.type?.name === 'CRMS'
          ? 'CRM'
          : detail?.type?.name === undefined
          ? '-'
          : detail?.type?.name
      }`,
      250,
      55
    );
    doc.text(
      `Model : ${
        detail?.customer?.bank_desc === 'Bank Central Asia'
          ? detail?.model_bca === null
            ? '-'
            : detail?.model_bca
          : detail?.model?.type === undefined
          ? '-'
          : detail?.model?.type
      }`,
      250,
      70
    );
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 95 },
      head: [
        [
          'No',
          'Serial Number',
          'Machine Series',
          'Machine Brand',
          'Machine Type',
          'Machine Category',
          'Machine Row Number',
          'Warehouse',
        ],
      ],
      headStyles: { fontSize: 8, halign: 'center' },
      columnStyles: {
        0: { fontSize: 8, halign: 'center' },
        1: { fontSize: 8, halign: 'center' },
        2: { fontSize: 8, halign: 'center' },
        3: { fontSize: 8, halign: 'center' },
        4: { fontSize: 8, halign: 'center' },
        5: { fontSize: 8, halign: 'center' },
        6: { fontSize: 8, halign: 'center' },
        7: { fontSize: 8, halign: 'center' },
        // 7: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Summary Machine ${moment().format('LL')}.pdf`);
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
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      MACHINE SUMMARY
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
            getUser={getUser}
          />
        }
        contentToolbar={
          <div className="flex flex-auto items-center ">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
              {userRoles !== 'GUEST_RELATED' && (
                <div className="w-full flex">
                  <div>
                    <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                      <Button variant="contained" onClick={downloadPDF}>
                        <PictureAsPdfIcon className="mr-2" />
                        <div className="hidden md:contents">Export To PDF</div>
                      </Button>
                    </FuseAnimate>
                  </div>
                  <div className="ml-10">
                    <HandleExportExcel
                      datasLoop={datasLoop}
                      datas={datas}
                      detail={detail}
                      listPO={id_po}
                      body={body}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div className="mb-20">
                <div className="w-full mx-10 my-5 grid grid-cols-3 gap-4 text-lg">
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      NO PO : {''}
                      {body?.id_po?.no_po_master === undefined ? '-' : body?.id_po?.no_po_master}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Customer : {''}
                      {detail?.customer?.bank_desc === undefined
                        ? '-'
                        : detail?.customer?.bank_desc}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Batch : {''}
                      {detail?.batch?.name === undefined ? '-' : detail?.batch?.name}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Tanggal Masuk : {''}
                      {detail?.tgl_masuk === undefined
                        ? '-'
                        : moment(detail?.tgl_masuk).format('LL')}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Type : {''}
                      {detail?.customer?.bank_desc === 'Bank Central Asia' &&
                      detail?.type?.name === 'ATMS'
                        ? 'ATM'
                        : detail?.customer?.bank_desc === 'Bank Central Asia' &&
                          detail?.type?.name === 'CRMS'
                        ? 'CRM'
                        : detail?.type?.name}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Model : {''}
                      {detail?.customer?.bank_desc === 'Bank Central Asia'
                        ? detail?.model_bca === null
                          ? '-'
                          : detail?.model_bca
                        : detail?.model?.type === undefined
                        ? '-'
                        : detail?.model?.type}
                    </Typography>
                    <Divider />
                  </div>
                </div>
              </div>
              <div>
                <TableSummaryMachine
                  datasLoop={datasLoop}
                  propsFromParrentNew={propsFromParrentNew}
                  userRoles={userRoles}
                  detail={detail}
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
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

export default SummaryMachineParent;
