/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { showMessage } from 'app/store/fuse/messageSlice';
import { Navigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HandleAddDetail from './action/HandleAddDetail';
import TableWarehouseTransfer from './TableWarehouseTransfer';
import HandleExportExcel from './action/HandleExportExcel';

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

const WarehouseTransferParent = (props) => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  // console.log(userRoles);
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  // const formatDate = moment().format('YYYY-DD-MM');
  const formatDate = 'YYYY-MM-DD HH:mm:ss';
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // setOpen(true);

  const [data, setData] = useState([]);
  const [dataForm, setdataForm] = useState([]);
  const [getDatasPoById, setgetDatasPoById] = useState([]);

  const [id_po, setid_po] = useState('');
  const [jumlah, setjumlah] = useState(1);
  const [to_warehouse, setto_warehouse] = useState('');
  const [tgl_keluar, settgl_keluar] = useState(null);
  const [tgl_masuk, settgl_masuk] = useState(null);
  const [tgl_staging, settgl_staging] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [id_customer, setid_customer] = useState({
    id: null,
    name: '',
  });
  const [from_warehouse, setfrom_warehouse] = useState({
    id: null,
    name: '',
  });
  const [sn_mesins, setsnmesins] = useState([]);

  const [pic, setpic] = useState('');
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

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const body = {
    id_po,
    id_customer,
    jumlah,
    from_warehouse,
    to_warehouse,
    tgl_keluar:
      moment(tgl_keluar).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date'
        ? null
        : moment(tgl_keluar).format('YYYY-MM-DD HH:mm:ss'),
    tgl_masuk:
      moment(tgl_masuk).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date'
        ? null
        : moment(tgl_masuk).format('YYYY-MM-DD HH:mm:ss'),
    tgl_staging:
      moment(tgl_staging).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date'
        ? null
        : moment(tgl_staging).format('YYYY-MM-DD HH:mm:ss'),
    pic,
    sn_mesins,
  };
  // console.log(body, 'body');
  const setBody = {
    setid_po,
    setid_customer,
    setjumlah,
    setfrom_warehouse,
    setto_warehouse,
    settgl_keluar,
    settgl_masuk,
    settgl_staging,
    setpic,
    setsnmesins,
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}warehouse-transfer`, config)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
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
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  // console.log(data, 'data');

  useEffect(() => {
    if (id_po !== '') {
      axios
        .get(`${api}purchaseOrder/${id_po}/datas`, config)
        .then((res) => {
          setgetDatasPoById(res?.data?.data);
          setid_customer({
            id: res.data.data?.customer?.id,
            name: res.data.data?.customer?.bank_desc,
          });
          setfrom_warehouse({
            id: res.data.data?.gudang?.id,
            name: res.data.data?.gudang?.gudang_desc,
          });
        })
        .catch((err) => {
          setgetDatasPoById([]);
          setid_customer({
            id: null,
            name: '',
          });
          setfrom_warehouse({
            id: null,
            name: '',
          });
          console.log(err, 'err');
        });
    }
  }, [id_po]);
  // console.log(id_customer, 'id_customer');
  // console.log(from_warehouse, 'from_warehouse');

  const newBody = {
    ...body,
    id_customer: body?.id_customer?.id,
    from_warehouse: body?.from_warehouse?.id,
  };

  let bodyApi = {
    ...body,
  };
  if (newBody?.customer === undefined) {
    // console.log('dapet body');
    bodyApi = newBody;
  } else {
    // console.log('dapet newBody');
    bodyApi = body;
  }
  // console.log(bodyApi, 'bodyApi');

  const HandleSubmit = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${api}warehouse-transfer`, bodyApi, config)
      .then((res) => {
        // console.log('respnse222', res);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Added', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getData();
        setid_po('');
        setid_customer({
          id: null,
          name: '',
        });
        setjumlah(1);
        setfrom_warehouse({
          id: null,
          name: '',
        });
        setto_warehouse('');
        settgl_keluar(null);
        settgl_masuk(null);
        settgl_staging(null);
        setpic('');
        handleClose();
        <Navigate to="/apps/warehouseTransfer" replace />;
        // navigate("/login");
      })
      .catch((err) => {
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
        console.log(err, 'err');
      });
  };

  function createData(
    no,
    purchaseOrder,
    jumlah,
    sn_mesins,
    from_warehouse,
    to_warehouse,
    tgl_masuk,
    tgl_keluar,
    tgl_staging,
    pic
  ) {
    return {
      no,
      purchaseOrder,
      jumlah,
      sn_mesins,
      from_warehouse,
      to_warehouse,
      tgl_masuk,
      tgl_keluar,
      tgl_staging,
      pic,
    };
  }

  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.purchaseOrder?.no_po,
      item?.jumlah,
      (item?.sn_mesins).map((subitem) => subitem?.snMesin),
      item?.from_warehouse?.gudang_desc,
      item?.to_warehouse?.gudang_desc,
      moment(item?.tgl_masuk).format('YYYY-DD-MM'),
      moment(item?.tgl_keluar).format('YYYY-DD-MM'),
      moment(item?.tgl_staging).format('YYYY-DD-MM'),
      item?.pic?.name
    )
  );
  const DataForBody = [];

  for (let index = 0; index < datas.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }

  // console.log(DataForBody, 'DataForBody');
  // console.log(datas, 'datas');

  // const downloadPDF = () => {
  //   const doc = new jsPDF('l', 'pt', 'legal');
  //   const columnWidth = 80; // Lebar kolom
  //   // const snMesins = doc.splitTextToSize(DataForBody?.sn_mesins || '', columnWidth);
  //   doc.splitTextToSize(DataForBody[3] || '', columnWidth);
  //   doc.text(`Warehouse Transfer Tanggal ${moment().format('LL')}`, 20, 20);
  //   const index = 0;
  //   autoTable(doc, {
  //     theme: 'striped',
  //     head: [
  //       [
  //         'N0',
  //         'No PO',
  //         'Jumlah',
  //         'SN Mesin',
  //         'Gudang Asal',
  //         'Gudang Tujuan',
  //         'Tanggal Masuk',
  //         'Tanggal Keluar',
  //         'Tanggal Staging',
  //         'PIC',
  //       ],
  //     ],
  //     headStyles: { fontSize: 7, halign: 'center' },
  //     columnStyles: {
  //       0: { fontSize: 7, halign: 'center' },
  //       1: { fontSize: 7, halign: 'center' },
  //       2: { fontSize: 7, halign: 'center' },
  //       3: { fontSize: 7, halign: 'center' },
  //       4: { fontSize: 7, halign: 'center' },
  //       5: { fontSize: 7, halign: 'center' },
  //       6: { fontSize: 7, halign: 'center' },
  //       7: { fontSize: 7, halign: 'center' },
  //       8: { fontSize: 7, halign: 'center' },
  //       9: { fontSize: 7, halign: 'center' },
  //       10: { fontSize: 7, halign: 'center' },
  //     },

  //     body: DataForBody,
  //     // body: [DataPDF, DataPDF],
  //   });
  //   doc.save(`Warehouse Transfer ${moment().format('LL')}.pdf`);
  // };
  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    const columnWidth = 80; // Lebar kolom

    doc.text(`Warehouse Transfer Tanggal ${moment().format('LL')}`, 20, 20);

    const formattedData = [];
    const snMesinLineBreak = 3; // Jumlah elemen "SN Mesin" sebelum baris baru

    DataForBody.forEach((item) => {
      const snMesins = item[3];
      const formattedSnMesins = [];

      snMesins.forEach((snMesin, index) => {
        formattedSnMesins.push(snMesin);
        if ((index + 1) % snMesinLineBreak === 0) {
          formattedSnMesins.push('\n');
        } else {
          formattedSnMesins.push(', '); // Tambahkan koma setelah setiap elemen
        }
      });

      formattedData.push([
        item[0],
        item[1],
        item[2],
        formattedSnMesins.join(''), // Menggabungkan dengan tanpa spasi
        item[4],
        item[5],
        item[6],
        item[7],
        item[8],
        item[9],
      ]);
    });

    const tableData = {
      head: [
        [
          'N0',
          'No PO',
          'Jumlah',
          'SN Mesin',
          'Gudang Asal',
          'Gudang Tujuan',
          'Tanggal Masuk',
          'Tanggal Keluar',
          'Tanggal Staging',
          'PIC',
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
      },
      body: formattedData,
    };

    autoTable(doc, tableData);

    doc.save(`Warehouse Transfer ${moment().format('LL')}.pdf`);
  };

  // console.log(DataForBody);

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
                    <Typography className="my-16 sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      WAREHOUSE TRANSFER
                    </Typography>
                    {/* <Typography className="hidden sm:flex mx-0 sm:mx-12 text-xs" variant="h5">
                      Machine List
                    </Typography> */}
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        contentToolbar={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
              {userRoles === 'OPERATOR_DIP' ||
              userRoles === 'SUPERVISOR' ||
              userRoles === 'SUPER_ADMIN' ||
              userRoles === 'ADMIN' ? (
                <div className="flex justify-between">
                  <div className="flex justify-start">
                    <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                      <Button
                        disabled={userRoles === 'OPERATOR_DIP'}
                        variant="contained"
                        onClick={handleClickOpens}
                      >
                        <AddCircleOutlineIcon className="mr-2" />
                        <div className="hidden md:contents">Add New Data</div>
                      </Button>
                    </FuseAnimate>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            {userRoles !== 'GUEST_RELATED' && (
              <div className="flex justify-end pr-10">
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button className="mr-10" variant="contained" onClick={downloadPDF}>
                    <PictureAsPdfIcon className="mr-2" />
                    <div className="hidden md:contents">Export PDF</div>
                  </Button>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <HandleExportExcel datas={datas} />
                </FuseAnimate>
              </div>
            )}
            <Dialog
              maxWidth="xl"
              // maxWidth="lg"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">New Data - Warehouse Transfer</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <HandleAddDetail
                    userRoles={userRoles}
                    getDatasPoById={getDatasPoById}
                    getAccessToken={getAccessToken}
                    api={api}
                    loading={loading}
                    body={body}
                    newBody={newBody}
                    setBody={setBody}
                    HandleSubmit={HandleSubmit}
                    handleClose={handleClose}
                  />
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TableWarehouseTransfer
                  userRoles={userRoles}
                  body={body}
                  newBody={newBody}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  getData={getData}
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

export default WarehouseTransferParent;
