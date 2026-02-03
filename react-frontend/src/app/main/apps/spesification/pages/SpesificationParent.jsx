/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
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
import { showMessage } from 'app/store/fuse/messageSlice';
import { Navigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import HandleAddDetail from './action/HandleAddDetail';
import TableSpesification from './TableSpesification';
import HandleExportExcel from './action/HandleExportExcel';

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

const SpesificationParent = props => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userId = getUser[0]?.id;
  }
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
  // console.log(data, 'data header');
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
  const [sn_mesins, setsnmesins] = useState('');

  const [pic, setpic] = useState('');
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
      .get(`${api}spekmesin/${userId}`, config)
      .then(res => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data.data, 'datas');
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
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 401) {
          messages = 'To Many Requset!!';
        }  else if (errStatus === 400) {
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
      // getDataDetail()
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  // console.log(id_customer, 'id_customer')

  useEffect(() => {
    if (id_po !== '') {
      axios
        .get(`${api}purchaseOrder/${id_po}/datas`, config)
        .then(res => {
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
        .catch(err => {
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

  const HandleSubmit = async event => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${api}warehouse-transfer`, bodyApi, config)
      .then(res => {
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
      .catch(err => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
        console.log(err, 'err');
      });
  };
  const porpsFromParent = (state, setValues) => {
    // if (!open) {
    //   setValues({
    //     id_po: null,
    //     id_po_name: '',
    //     sn_mesins: null,
    //     sn_mesins_name: null,
    //     id_type_mesin: null,
    //     id_type_mesin_name: '',
    //     model: null,
    //     model_Name: '',
    //     pn_system: '',
    //     customer: null,
    //     customerName: '',
    //   });
    // }
    // console.log(state);
  };

  function createData(
    no,
    detail_po,
    model,
    mesin,
    pn_system,
    customer,
    time_todo,
    approval_staging,
    approval_tss
  ) {
    return {
      no,
      detail_po,
      model,
      mesin,
      pn_system,
      customer,
      time_todo,
      approval_staging,
      approval_tss,
    };
  }

  const datas = data?.map((item, index) =>
    // const data = [];
    //   row?.sn_mesins.map((item, idx) => {
    //     data.push(item?.snMesin);
    //   });

    // item.sn_mesins((data) => {
    //   sn.push(item?.snMesin);
    // })

    createData(
      index + 1,
      item?.detail_po?.no_po ? item?.detail_po?.no_po : '-',
      item?.model?.name ? item?.model?.name : '-',
      item?.mesin?.type ? item?.mesin?.type : '-',
      item?.pn_system ? item?.pn_system : '-',
      item?.customer?.bank_desc ? item?.customer?.bank_desc : '-',
      item?.time_todo ? item?.time_todo : '-',
      item?.approval_staging?.name ? item?.approval_staging?.name : '-',
      item?.approval_tss?.name ? item?.approval_tss?.name : '-'
    )
  );
  // console.log(datas, 'datassss');
  const DataForBody = [];

  for (let index = 0; index < datas.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
    // console.log(datas[index], 'DataForBody');
  }

  // console.log(DataForBody, 'DataForBody');
  // console.log(datas, 'datas');

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`Specification Tanggal ${moment().format('LL')}`, 20, 20);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'N0',
          'No PO',
          'Type',
          'Model',
          'Part Number System',
          'Customer',
          'Time',
          'Approval PIC Staging',
          'Approval PIC TSS',
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
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Specification ${moment().format('LL')}.pdf`);
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
            <div className="flex my-10 py-10 flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography
                    className="flex items-left mt-20 sm:mb-12 flex-col"
                    color="inherit"
                  >
                    <Typography
                      className=" sm:flex mx-0 sm:mx-12 text-xl"
                      variant="h3"
                    >
                      SPECIFICATION
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
              {userRoles === 'SUPER_ADMIN' ||
              userRoles === 'ADMIN' ||
              userRoles === 'SUPERVISOR' ||
              userRoles === 'OPERATOR_DIP' ? (
                <div>
                  <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                    <Button variant="contained" onClick={handleClickOpens}>
                      <AddCircleOutlineIcon className="mr-2" />
                      <div className="hidden md:contents">Add New Data</div>
                    </Button>
                  </FuseAnimate>
                </div>
              ) : (
                ''
              )}
            </div>
            {(userRoles === 'SUPER_ADMIN' ||
              userRoles === 'ADMIN' ||
              userRoles === 'SUPERVISOR' ||
              userRoles === 'OPERATOR_DIP' ||
              userRoles === 'GUEST' ||
              userRoles === 'GUEST_DIP' ||
              userRoles === 'OPERATOR_TSS') && (
              <div className="flex justify-end pr-10">
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button
                    className="mr-10"
                    variant="contained"
                    onClick={downloadPDF}
                  >
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
              <DialogTitle id="alert-dialog-title">
                New Data - Specification
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <HandleAddDetail
                    porpsFromParent={porpsFromParent}
                    userRoles={userRoles}
                    getDatasPoById={getDatasPoById}
                    getAccessToken={getAccessToken}
                    getData={getData}
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
                <TableSpesification
                  userRoles={userRoles}
                  body={body}
                  newBody={newBody}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  // dataDetail={dataDetail}
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

export default SpesificationParent;
