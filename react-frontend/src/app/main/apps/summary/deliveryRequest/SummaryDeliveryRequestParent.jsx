/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */
import * as React from 'react';
import { Button, Divider, Typography } from '@mui/material';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { HandleForm } from './action/HandleForm';
import TableSummaryDeliveryRequest from './TableSummaryDeliveryRequest';
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SummaryDeliveryRequestParent = (props) => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  const getAccessToken = localStorage.getItem('access_token');
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dispatch = useDispatch();
  const formatDate = 'YYYY-MM-DD HH:mm:ss';
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [sumTotal, setsumTotal] = useState(0);
  const [id_po, setid_po] = useState('');
  const [customer, setcustomer] = useState('');
  const [model, setmodel] = useState('');
  const [id_type_mesin, setid_type_mesin] = useState('');
  const [nama_gudang, setnama_gudang] = useState('');
  const [value, setValue] = useState({});
  const [snMesin, setSNMesin] = useState(null);
  const [request_by, setRequestBY] = useState(null);
  const [valueId_po, setvalueId_po] = useState(null);
  const [purpose, setpurpose] = useState('');
  const [contact_person, setcontact_person] = useState('');
  const [contact_no, setcontact_no] = useState('');
  const [address, setaddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    category: '',
    type: '',
    model: '',
    customer: '',
    warehouse: '',
    task: '',
    no_mesin: null,
    sn_mesin: null,
    id_po: null,
  });

  const bodys = {
    category: values?.category,
    type: values?.type,
    model: values?.model,
    customer: values?.customer,
    warehouse: values?.warehouse,
    task: values?.task,
    no_mesin: values?.no_mesin === undefined ? null : values?.no_mesin,
    sn_mesin: values?.sn_mesin === undefined ? null : values?.sn_mesin,
    id_po: valueId_po === undefined ? null : valueId_po,
    purpose,
    contact_person,
    contact_no,
    address,
    request_by,
  };
  const disable =
    bodys?.category === '' ||
    bodys?.type === '' ||
    bodys?.model === '' ||
    bodys?.customer === '' ||
    bodys?.warehouse === '' ||
    bodys?.task === '' ||
    bodys?.no_mesin === null ||
    bodys?.sn_mesin === null ||
    bodys?.id_po === null ||
    bodys?.purpose === '' ||
    bodys?.contact_person === '' ||
    bodys?.contact_no === '' ||
    bodys?.request_by === null ||
    // loading === true ||
    bodys?.address === '';

  const getPropsBody = {
    valueId_po,
    purpose,
    contact_person,
    contact_no,
    address,
    request_by,
    // snMesin,
    values,
  };
  const getPropsSetBody = {
    setSNMesin,
    setRequestBY,
    setvalueId_po,
    setpurpose,
    setcontact_person,
    setcontact_no,
    setaddress,
    setValues,
  };

  // console.log(bodys, 'bodys');

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      category: '',
      type: '',
      model: '',
      customer: '',
      warehouse: '',
      task: '',
      no_mesin: null,
      sn_mesin: null,
      id_po: null,
    });
    setvalueId_po(null);
    setpurpose('');
    setSNMesin(null);
    setRequestBY(null);
    setcontact_person('');
    setcontact_no('');
    setaddress('');
  };
  // console.log(model);

  function createData(
    id,
    detail_po,
    address,
    purpose,
    contact_person,
    contact_no,
    created_at,
    task,
    status_approval,
    request_by,
    category,
    detail_sn_mesin
  ) {
    return {
      id,
      detail_po,
      address,
      purpose,
      contact_person,
      contact_no,
      created_at,
      task,
      status_approval,
      request_by,
      category,
      detail_sn_mesin,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      // item?.id,
      index + 1,
      item?.detail_po?.customer?.bank_desc,
      moment(item?.tanggal_request).format('LL'),
      item?.purpose === null ? '-' : item?.purpose,
      item?.contact_person === null ? '-' : item?.contact_person,
      item?.contact_no === null ? '-' : item?.contact_no,
      item?.address === null ? '-' : item?.address,
      item?.request_by?.name,
      item?.detail_po?.gudang?.gudang_desc,
      item?.status_approval === null
        ? 'Approval'
        : item?.status_approval === '0'
        ? 'Reject'
        : 'Approved'
      // item?.request_by,
      // item?.category,
      // item?.detail_sn_mesin
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
    doc.text(`List Delivery Request Tanggal ${moment().format('LL')}`, 20, 20);
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
      margin: { top: 65 },
      head: [
        [
          'N0',
          'Customer',
          'Date',
          'Purpose',
          'Contact Person',
          'No Contact',
          'Address',
          'Request By',
          'Warehouse',
          'Approve',
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
    doc.save(`Download Delivery Request ${moment().format('LL')}.pdf`);
  };

  const getData = async () => {
    const response = axios
      .get(`${api}getAllDeliveryRequest`, config)
      .then((res) => {
        setData(res?.data?.data);
        // setsumTotal((res?.data?.data).reduce((total, obj) => total + obj?.total, 0));
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
  // console.log(bodys, 'bodys');

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}deliveryRequest`, bodys, config)
      .then((res) => {
        setLoading(false);
        getData();
        dispatch(
          showMessage({
            message: `Data Berhasil Di Tambahkan`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        handleClose();
      })
      .catch((err) => {
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
        console.log(err);
      });
  };
  const propFromParent = (body) => {
    setValue(body);
  };
  // console.log(bodys, 'bodys');
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
                      Delivery Request
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        // leftSidebarContent={
        //   <HandleFilter getAccessToken={getAccessToken} body={body} setBody={setBody} />
        // }
        contentToolbar={
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-ful flex-col md:flex-row md:items-center md:mt-0">
              {(userRoles === 'SUPER_ADMIN' ||
                userRoles === 'ADMIN' ||
                userRoles === 'SUPERVISOR' ||
                userRoles === 'OPERATOR_DIP') && (
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button
                    disabled={userRoles === 'OPERATOR_DIP'}
                    className="mr-10"
                    variant="contained"
                    onClick={handleClickOpens}
                  >
                    <AddCircleOutlineIcon className="mr-2" />
                    <div className="hidden md:contents">Add Order</div>
                  </Button>
                </FuseAnimate>
              )}
              {(userRoles === 'SUPER_ADMIN' ||
                userRoles === 'ADMIN' ||
                userRoles === 'SUPERVISOR' ||
                userRoles === 'OPERATOR_DIP' ||
                userRoles === 'GUEST' ||
                userRoles === 'OPERATOR_TSS') && (
                <>
                  <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                    <Button className="mr-10" variant="contained" onClick={downloadPDF}>
                      <PictureAsPdfIcon className="mr-2" />
                      <div className="hidden md:contents">Export PDF</div>
                    </Button>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                    <HandleExportExcel data={data} />
                  </FuseAnimate>
                </>
              )}
              <Dialog
                open={open}
                className="m-10"
                TransitionComponent={Transition}
                keepMounted
                maxWidth="400px"
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Add Delivery Request</DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <HandleForm
                      propFromParent={propFromParent}
                      getPropsBody={getPropsBody}
                      getPropsSetBody={getPropsSetBody}
                      snMesin={snMesin}
                      request_by={request_by}
                      // handleClose={handleClose}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" disabled={disable} onClick={handleSubmit}>
                    {loading === true ? '...Loading' : 'Save'}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                {/* <Cards
                  getData={getData}
                  userRoles={userRoles}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  sumTotal={sumTotal}
                  // getData={getData}
                  handleClose={handleClose}
                /> */}

                <TableSummaryDeliveryRequest
                  getData={getData}
                  userRoles={userRoles}
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

export default SummaryDeliveryRequestParent;
