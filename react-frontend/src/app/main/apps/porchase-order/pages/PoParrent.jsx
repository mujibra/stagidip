/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/* eslint-disable no-restricted-globals */
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
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Navigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HandleAddDetail from './action/HandleAddDetail';
import TablePO from './TablePO';
import POSidebarContent from './POSidebarContent';
import HandleExportExcel from './action/HandleExportExcel';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
  dialog: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
}));
// const navigate = useNavigate();

const PoParrent = (props) => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }

  const dispatch = useDispatch();
  const formatDateTahun = moment().format('MMMM YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataForm, setdataForm] = useState([]);

  const [no_po, setno_po] = useState('');
  // const [no_po_dummy, setno_po_dummy] = useState('');
  const [nama_gudang, setnama_gudang] = useState('');
  const [tgl_po, settgl_po] = useState(null);
  const [pic_staging, setpic_staging] = useState('');
  const [model, setmodel] = useState('');
  const [id_type_mesin, setid_type_mesin] = useState('');
  const [id_po_master, setid_po_master] = useState('');
  // const [po_master, setpo_master] = useState('');
  const [batch, setbatch] = useState('');
  const [brand, setbrand] = useState('HYOSUNG');
  const [part_number, setpart_number] = useState('');
  const [tgl_masuk, settgl_masuk] = useState(null);
  const [tgl_produksi, settgl_produksi] = useState(null);
  const [customer, setcustomer] = useState({
    id: null,
    name: '',
  });
  const [tgl_staging, settgl_staging] = useState(null);
  const [jumlah, setjumlah] = useState(1);
  const [jml_mesin_staging, setjml_mesin_staging] = useState(1);
  const [stok, setstok] = useState(1);
  const [total_transfer, settotalTransfer] = useState(1);
  const [tahun_produksi, settahun_produksi] = useState(null);
  const [copy_from_id_po, setcopy_from_id_po] = useState(null);
  const [sn_mesins, setsn_mesins] = useState([]);
  const [status_po, setstatus_po] = useState('');
  const [status_mesin, setstatus_mesin] = useState('');
  const [loading, setLoading] = useState(true);
  const [openProses, setOpenProses] = useState(true);
  const [token, setToken] = useState();
  const [sn_batch, setsn_batch] = useState('');
  const [style, setstyle] = useState('');
  const [id_status_po, setid_status_po] = useState('');

  // if (model === '') {
  //   setid_type_mesin('');
  // }

  // add by ardie 2023-04-05
  const [valueTglAwal, setValueTglAwal] = useState(null);
  const [valueTglAkhir, setValueTglAkhir] = useState(null);
  const [valueNoPO, setValueNOPO] = useState('');

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const body = {
    id_po_master,
    no_po,
    style,
    copy_from_id_po,
    sn_mesins,
    // no_po_dummy,
    // tgl_po: moment(tgl_po).format('YYYY-MM-DD HH:mm:ss'),
    tgl_po,
    status_po,
    part_number,
    model,
    status_mesin,
    nama_gudang,
    pic_staging,
    id_type_mesin,
    batch,
    brand,
    // tgl_masuk: moment(tgl_masuk).format('YYYY-MM-DD HH:mm:ss'),
    tgl_masuk,
    // tgl_staging: moment(tgl_staging).format('YYYY-MM-DD HH:mm:ss'),
    tgl_staging,
    customer,
    jumlah,
    jml_mesin_staging,
    stok,
    tahun_produksi,
    total_transfer,
    sn_batch,
    id_status_po,
    // po_master
  };
  const setBody = {
    setid_po_master,
    setcopy_from_id_po,
    setsn_mesins,
    setno_po,
    setstyle,
    setstatus_po,
    setnama_gudang,
    setstatus_mesin,
    settgl_po,
    setpic_staging,
    setmodel,
    setid_type_mesin,
    setbatch,
    setbrand,
    setpart_number,
    settgl_masuk,
    settgl_staging,
    setcustomer,
    setjumlah,
    setjml_mesin_staging,
    setstok,
    settahun_produksi,
    settgl_produksi,
    settotalTransfer,
    setsn_batch,
    setid_status_po,
    // setpo_master
  };
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const configPost = {
    // body: body,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleClickOpens = () => {
    setOpen(true);
  };
  // console.log(body, 'body');

  const handleClose = () => {
    setOpen(false);
    setstatus_po('');
    setstatus_mesin('');
    setnama_gudang('');
    setno_po('');
    setpart_number('');
    settgl_po(null);
    setpic_staging('');
    setmodel('');
    setstyle('');
    setid_type_mesin('');
    setbatch('');
    setid_po_master('');
    // setpo_master('');
    settgl_masuk(null);
    settgl_staging(null);
    setcustomer({
      id: null,
      name: '',
    });
    setjumlah(1);
    setjml_mesin_staging(1);
    settahun_produksi(null);
    setsn_batch('');
    setid_status_po('');
  };

  const getData = async () => {
    setLoading(true);
    let urlParam = '';

    if (valueTglAwal != null && valueTglAkhir != null) {
      urlParam = `purchaseOrder/${moment(valueTglAwal).format('YYYY-MM-DD')}/${moment(
        valueTglAkhir
      ).format('YYYY-MM-DD')}/ranges`;
    } else if (valueTglAwal != null && valueTglAkhir == null) {
      urlParam = `purchaseOrder/${moment(valueTglAwal).format('YYYY-MM-DD')}/NULL/ranges`;
    } else {
      urlParam = `purchaseOrder/${getUser[0]?.id}`;
    }

    const response = await axios
      .get(`${api}${urlParam}`, config)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        console.log(err);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        // const errStatus = err.response.status;
        // const errMessage = err.response.data.errorMessage;
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
      });
  };
  const [getDatasPoById, setgetDatasPoById] = useState([]);
  useEffect(() => {
    if (id_po_master !== '') {
      axios
        .get(`${api}master-po/${id_po_master}`, config)
        .then((res) => {
          setgetDatasPoById(res.data.data);
          setcustomer({
            id: res.data.data[0]?.customer?.id,
            name: res.data.data[0]?.customer?.bank_desc,
          });
          settgl_po(res.data.data[0]?.tgl_po);
        })
        .catch((err) => {
          setgetDatasPoById([]);
          setcustomer('');
          settgl_po(null);
          console.log(err, 'err');
        });
    }
  }, [id_po_master]);

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, [valueTglAwal, valueTglAkhir, openProses]);

  const newBody = {
    ...body,
    customer: body?.customer?.id,
  };

  let bodyApi = {
    ...body,
  };
  if (newBody?.customer === undefined) {
    bodyApi = body;
  } else {
    bodyApi = newBody;
  }
  const newBodys = {
    ...bodyApi,
    model: model?.id === undefined ? null : model?.id,
    status_mesin,
    nama_gudang: nama_gudang?.id === undefined ? null : nama_gudang?.id,
    pic_staging: pic_staging?.id === undefined ? null : pic_staging?.id,
    id_type_mesin: id_type_mesin?.id === undefined ? null : id_type_mesin?.id,
    // id_status_po: id_status_po?.id === undefined ? null : id_status_po?.id,
    batch: batch?.id === undefined ? null : batch?.id,
    customer: customer?.id === undefined ? null : customer?.id,
    style: style?.id === undefined ? null : style?.id,
    sn_mesins: JSON.stringify(sn_mesins),
    // po_master
  };
  // console.log(newBodys, 'newBodys');

  const HandleSubmit = async (event) => {
    // setcustomer(getDatasPoById[0]?.customer?.id);
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${api}purchaseOrder`, newBodys, configPost)
      .then((res) => {
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
        setstatus_po('');
        setid_status_po('');
        setcopy_from_id_po(null);
        setsn_mesins(null);
        setstatus_mesin('');
        setnama_gudang('');
        setno_po('');
        setpart_number('');
        settgl_po(null);
        setpic_staging('');
        setmodel('');
        setid_type_mesin('');
        setbatch('');
        settgl_masuk(null);
        settgl_staging(null);
        setcustomer({
          id: null,
          name: '',
        });
        setjumlah(1);
        setjml_mesin_staging(1);
        settahun_produksi(null);
        setsn_batch('');
        handleClose();
        <Navigate to="/apps/stagging/newMachine" replace />;
        // navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // console.log(err?.response);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          // handleLogout();
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
      });
  };
  function createData(
    no,
    no_po,
    status_po,
    tgl_po,
    customer,
    total_transfer,
    jumlah,
    jml_mesin_staging,
    model,
    mesin,
    brand,
    batch,
    part_number,
    sn_batch,
    style,
    tahun_produksi,
    gudang,
    tgl_masuk,
    tgl_staging,
    pic_staging,
    status_mesin
  ) {
    return {
      no,
      no_po,
      status_po,
      tgl_po,
      customer,
      total_transfer,
      jumlah,
      jml_mesin_staging,
      model,
      mesin,
      brand,
      batch,
      part_number,
      sn_batch,
      style,
      tahun_produksi,
      gudang,
      tgl_masuk,
      tgl_staging,
      pic_staging,
      status_mesin,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.no_po === null ? '-' : item?.no_po,
      item?.status_po_details?.status_desc === null ? '-' : item?.status_po_details?.status_desc,
      moment(item?.tgl_po).format('YYYY-DD-MM'),
      item?.customer === null ? '-' : item?.customer?.bank_desc,
      item?.jumlah,
      item?.jumlah - item?.total_transfer,
      item?.jml_mesin_staging,
      item?.model?.name,
      item?.mesin?.type,
      item?.brand,
      item?.batch?.name,
      item?.part_number,
      item?.sn_batch === null ? '-' : item?.sn_batch,
      item?.style === null ? '-' : item?.style.name,
      moment(item?.tahun_produksi).format('MMMM-YYYY'),
      item?.gudang?.gudang_desc,
      moment(item?.tgl_masuk).format('YYYY-DD-MM'),
      moment(item?.tgl_staging).format('YYYY-DD-MM'),
      item?.pic_staging?.name,
      item?.status_mesin
    )
  );
  const DataForBody = [];

  for (let index = 0; index < datas?.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`List PO Tanggal ${moment().format('LL')}`, 20, 20);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'N0',
          'No PO',
          'Status PO',
          'Purchase Order Date',
          'Customer',
          'Total',
          'Quantity',
          'Quantity Staging',
          'Type',
          'Model',
          'Brand',
          'Batch',
          'PartNumber System',
          'SN Batch',
          'Style',
          'Production Year',
          'Warehouse',
          'Entry Date',
          'Staging Date',
          'PIC Staging',
          'Status Mesin',
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
        13: { fontSize: 7, halign: 'center' },
        14: { fontSize: 7, halign: 'center' },
        15: { fontSize: 7, halign: 'center' },
        16: { fontSize: 7, halign: 'center' },
        17: { fontSize: 7, halign: 'center' },
        18: { fontSize: 7, halign: 'center' },
        19: { fontSize: 7, halign: 'center' },
        20: { fontSize: 7, halign: 'center' },
        21: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Download PO ${moment().format('LL')}.pdf`);
  };
  // };
  // console.log(DataForBody, 'DataForBody');

  return (
    <div>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                  <Typography className=" sm:flex mx-0 sm:mx-12 text-xl">
                    <p>Staging Registration</p>
                  </Typography>
                  <Typography className=" sm:flex mx-0 sm:mx-12 text-xs">
                    <p>Staging List</p>
                  </Typography>
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        contentToolbar={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-full flex-col md:flex-row md:items-center md:mt-0">
              <div className="flex justify-between">
                {(userRoles === 'SUPER_ADMIN' ||
                  userRoles === 'ADMIN' ||
                  userRoles === 'SUPERVISOR' ||
                  userRoles === 'OPERATOR_DIP') && (
                  <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                    <Button className="mr-10" variant="contained" onClick={handleClickOpens}>
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
                      <HandleExportExcel datas={datas} />
                    </FuseAnimate>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center w-full lg2:w-1/3/2 md:w-1/2 justify-end mr-16">
              <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                <div>
                  {/* <Button variant="contained" className="mr-5">
                    <PrintIcon className="mr-2" />
                    <div className="hidden md:contents sm:contents">Print</div>
                  </Button> */}
                  {/* <Button variant="contained" className=" bg-green">
                    <FileOpenIcon className="mr-2" />
                    <div className="hidden md:contents sm:contents">Convert to Excel</div>
                  </Button> */}
                </div>
              </FuseAnimate>
            </div>
            <div>
              <Dialog
                maxWidth="xl"
                // classes={{
                //   paper: classes.dialog,
                // }}
                // maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Add Order</DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <HandleAddDetail
                      getDatasPoById={getDatasPoById}
                      getAccessToken={getAccessToken}
                      api={api}
                      loading={loading}
                      body={body}
                      newBodys={newBodys}
                      newBody={newBody}
                      setBody={setBody}
                      HandleSubmit={HandleSubmit}
                      handleClose={handleClose}
                    />
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TablePO
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
        leftSidebarContent={
          <POSidebarContent
            data={data}
            setData={setData}
            getData={getData}
            openProses={openProses}
            setOpenProses={setOpenProses}
            TglAwal={{
              valueTglAwal,
              setValueTglAwal,
            }}
            TglAkhir={{
              valueTglAkhir,
              setValueTglAkhir,
            }}
            Parameter={{
              valueNoPO,
              setValueNOPO,
            }}
          />
        }
        // innerScroll
      />
    </div>
  );
};

export default PoParrent;
