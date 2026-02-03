/* eslint-disable prefer-destructuring */
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
import TableSummaryAccessories from './TableSummaryAccessories';
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

const SummaryAccessoriesParent = (props) => {
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
  // console.log(data, 'dataa accesorioes');
  const [id_po, setid_po] = useState('');
  const [customer, setcustomer] = useState('');
  const [batch, setbatch] = useState('');
  const [model, setmodel] = useState('');
  const [id_type_mesin, setid_type_mesin] = useState('');
  const [getPartNumber, setgetPartNumber] = useState([]);
  const [getDataPO, setgetDataPO] = useState({});
  const [tgl_tiba, settgl_tiba] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [order, setOrder] = useState('');
  // console.log(order, 'orderrrrr');
  const [orderBy, setOrderBy] = useState('');
  // console.log(orderBy, 'idddd');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const propsFromParrentNew = (order, orderBy) => {
    setOrder(order);
    setOrderBy(orderBy);
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
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      // if (body?.batch !== '') {
      setLoading(true);
      axios
        .get(
          `${api}getAccessoriesSummary/v2/${
            body?.id_po?.id === undefined ? null : body?.id_po?.id
          }/${body?.batch === '' ? null : body?.batch}`,
          // `${api}getMachineSummary/null/null/null/null/null/null`,
          config
        )
        .then((res) => {
          setData(res?.data?.data);
          setLoading(false);
          // console.log(res, 'data');
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
      // }
    }
    return () => {
      isUnmout = true;
    };
  }, [body?.id_po?.id, body?.batch]);

  function createData(
    no,
    part_sn,
    merk_aksesoris,
    concat_tipe_aksesoris,
    concat_jenis_aksesoris,
    sn_paketmesin,
    no_baris_mesin,
    nama_gudang
  ) {
    return {
      no,
      part_sn,
      merk_aksesoris,
      concat_tipe_aksesoris,
      concat_jenis_aksesoris,
      sn_paketmesin,
      no_baris_mesin,
      nama_gudang,
    };
  }
  useEffect(() => {
    const listPartNumber = [];
    if (data?.data_po?.length !== 0 && data?.data_po?.length !== undefined) {
      setgetDataPO(data?.data_po[0]);
    }
    for (let index = 0; index < data?.data_po?.length; index++) {
      listPartNumber.push(data?.data_po[index].part_number);
    }
    setgetPartNumber(listPartNumber);
  }, [data]);
  // console.log(getPartNumber, 'listPartNumber');
  // console.log(getDataPO, 'getDataPO');

  const datas = data?.list_items?.items?.map((item, index) =>
    createData(
      index + 1,
      item?.part_sn === null || '' || undefined ? '-' : item?.part_sn,
      item?.merk_aksesoris === null || '' || undefined ? '-' : item?.merk_aksesoris,
      item?.concat_tipe_aksesoris === null || '' || undefined ? '-' : item?.concat_tipe_aksesoris,
      item?.concat_jenis_aksesoris === null || '' || undefined ? '-' : item?.concat_jenis_aksesoris,
      item?.sn_paketmesin === null || '' || undefined ? '-' : item?.sn_paketmesin,
      item?.no_baris_mesin === null || '' || undefined ? '-' : item?.no_baris_mesin,
      item?.nama_gudang === null || '' || undefined ? '-' : item?.nama_gudang
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
      item?.part_sn === null || '' || undefined ? '-' : item?.part_sn,
      item?.merk_aksesoris === null || '' || undefined ? '-' : item?.merk_aksesoris,
      item?.concat_tipe_aksesoris === null || '' || undefined ? '-' : item?.concat_tipe_aksesoris,
      item?.concat_jenis_aksesoris === null || '' || undefined ? '-' : item?.concat_jenis_aksesoris,
      item?.sn_paketmesin === null || '' || undefined ? '-' : item?.sn_paketmesin,
      item?.no_baris_mesin === null || '' || undefined ? '-' : item?.no_baris_mesin,
      item?.nama_gudang === null || '' || undefined ? '-' : item?.nama_gudang
    )
  );

  const DataForBody = [];

  if (datasLoop === undefined) {
    // eslint-disable-next-line no-unused-expressions
    DataForBody;
  } else {
    for (let index = 0; index < datasLoop.length; index++) {
      if (datasLoop.length !== 0) {
        DataForBody.push(Object.values(datasLoop[index]));
      }
    }
  }

  // console.log(DataForBody, 'datassss');
  const truncateArray = (arr, maxLength) => {
    const truncatedArr = arr.join(', ');
    if (truncatedArr.length <= maxLength) {
      return truncatedArr;
    }
    return `${truncatedArr.substring(0, maxLength)}...(${arr.length} PartNumber)`;
  };

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`List Accesories Summary on ${moment().format('LL')}`, 20, 20);
    const index = 0;
    doc.setFontSize(10);
    doc.text(`No PO  : ${getDataPO?.no_po === undefined ? '-' : getDataPO?.no_po}`, 20, 40);
    doc.text(
      `Customer : ${
        getDataPO?.customer?.bank_desc === undefined ? '-' : getDataPO?.customer?.bank_desc
      }`,
      20,
      55
    );
    doc.text(
      `Batch : ${getDataPO?.batch?.name === undefined ? '-' : getDataPO?.batch?.name}`,
      20,
      70
    );
    doc.text(
      `PN System : ${getPartNumber.length !== 0 ? getPartNumber?.join(', ') : '-'}`,
      250,
      40
    );
    doc.text(
      `Production Year : ${
        getDataPO?.no_po === undefined
          ? '-'
          : moment(data?.data_po[0]?.tahun_produksi).format('MMMM YYYY')
      }`,
      400,
      55
    );
    doc.text(
      `Entry Date : ${
        getDataPO?.no_po === undefined
          ? '-'
          : moment(data?.data_po[0]?.tgl_masuk).format('DD MMM YYYY')
      }`,
      400,
      70
    );
    doc.text(
      `Type : ${
        getDataPO?.customer?.bank_desc === 'Bank Central Asia' && getDataPO?.type?.name === 'ATMS'
          ? 'ATM'
          : getDataPO?.type?.name ||
            (getDataPO?.customer?.bank_desc === 'Bank Central Asia' &&
              getDataPO?.type?.name === 'CRMS')
          ? 'ATM'
          : getDataPO?.type?.name === undefined
          ? '-'
          : getDataPO?.type?.name
      }`,
      250,
      55
    );
    doc.text(
      `Model : ${
        getDataPO?.customer?.bank_desc === 'Bank Central Asia'
          ? getDataPO?.model_bca === null
            ? '-'
            : getDataPO?.model_bca
          : getDataPO?.model?.type === undefined
          ? '-'
          : getDataPO?.model?.type
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
          'Merk Accesories',
          'Tipe Accesories',
          'Jenis Accesories',
          'SN Paket Mesin',
          'No Baris Mesin',
          'Warehouse',
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
        // 7: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Accesories Summary ${moment().format('LL')}.pdf`);
  };
  // console.log(data, 'dataaa');

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
                      Accessories SUMMARY
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
          <div className="flex flex-auto items-center gap-4 grid-rows-1 ">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
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
                    getPartNumber={getPartNumber}
                    getDataPO={getDataPO}
                    datas={datas}
                    data={data}
                    listPO={id_po}
                  />
                </div>
              </div>
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
                      {getDataPO?.no_po === undefined ? '-' : getDataPO?.no_po}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Customer : {''}
                      {getDataPO?.customer?.bank_desc === undefined
                        ? '-'
                        : getDataPO?.customer?.bank_desc}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Batch : {''}
                      {getDataPO?.batch?.name === undefined ? '-' : getDataPO?.batch?.name}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      {/* PN System :<div>{getPartNumber?.join(', ')}</div>; */}
                      PN System :<div> {truncateArray(getPartNumber, 22)}</div>
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Type : {''}
                      {getDataPO?.customer?.bank_desc === 'Bank Central Asia' &&
                      getDataPO?.type?.name === 'ATMS'
                        ? 'ATM'
                        : getDataPO?.type?.name ||
                          (getDataPO?.customer?.bank_desc === 'Bank Central Asia' &&
                            getDataPO?.type?.name === 'CRMS')
                        ? 'ATM'
                        : getDataPO?.type?.name === undefined
                        ? '-'
                        : getDataPO?.type?.name}
                    </Typography>
                    <Divider />
                  </div>
                  <div>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      Model : {''}
                      {getDataPO?.customer?.bank_desc === 'Bank Central Asia'
                        ? getDataPO?.model_bca === null
                          ? '-'
                          : getDataPO?.model_bca
                        : getDataPO?.model?.type === undefined
                        ? '-'
                        : getDataPO?.model?.type}
                    </Typography>
                    <Divider />
                  </div>
                </div>
              </div>
              <div>
                <TableSummaryAccessories
                  propsFromParrentNew={propsFromParrentNew}
                  getDataPO={getDataPO}
                  userRoles={userRoles}
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

export default SummaryAccessoriesParent;
