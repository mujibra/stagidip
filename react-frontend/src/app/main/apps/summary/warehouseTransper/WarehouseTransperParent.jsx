/* eslint-disable array-callback-return */
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
import TableSummaryWarehouse from './TableSummaryWarehouse';
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

const WarehouseTransperParent = (props) => {
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
  const [id_po, setid_po] = useState(null);
  const [customer, setcustomer] = useState(null);
  const [snMesin, setsnMesin] = useState(null);
  const [tgl_tiba, settgl_tiba] = useState(null);
  const [nama_gudang, setnama_gudang] = useState(null);
  // console.log(id_po);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const [order, setOrder] = useState('');
  console.log(order, 'orderrrrr');
  const [orderBy, setOrderBy] = useState('');
  console.log(orderBy, 'idddd');

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
    snMesin: snMesin?.snMesin === undefined ? null : snMesin?.snMesin,
    nama_gudang,
    tgl_tiba: moment(tgl_tiba).format('YYYY-MM-DD'),
  };
  const setBody = {
    setid_po,
    setsnMesin,
    setnama_gudang,
    settgl_tiba,
    setcustomer,
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(
          `${api}get-warehouse-transfer/${body?.id_po?.id === undefined ? null : body?.id_po?.id}/${
            body?.snMesin
          }/${body?.nama_gudang}/${
            tgl_tiba === null ? null : moment(body?.tgl_tiba).format('YYYY-MM-DD')
          }`,
          config
        )
        .then((res) => {
          setData(res?.data?.data);
          setLoading(false);
          // console.log(res?.data?.data, 'ree');
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
  }, [id_po, body?.snMesin, body?.customer, body.nama_gudang, tgl_tiba, body?.tgl_tiba]);
  // console.log(snMesin);

  function createData(no, no_po, mesin, tgl_tiba, gudang) {
    return {
      no,
      no_po,
      // customer,
      tgl_tiba,
      mesin,
      gudang,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      item?.purchaseOrder?.no_po,
      (item?.sn_mesins).map((subitem) => subitem?.snMesin),
      item?.tgl_masuk,
      item?.to_warehouse?.gudang_desc
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

  const datasLoop = stableSort(data, getComparator(order, orderBy))?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      item?.purchaseOrder?.no_po,
      (item?.sn_mesins).map((subitem) => subitem?.snMesin),
      moment(item?.tgl_masuk).format('ll'),
      item?.to_warehouse?.gudang_desc
    )
  );

  const DataForBody = [];

  for (let index = 0; index < datasLoop.length; index++) {
    if (datasLoop.length !== 0) {
      DataForBody.push(Object.values(datasLoop[index]));
    }
  }
  // console.log(data, 'datas');

  // const downloadPDF = () => {
  //   const doc = new jsPDF("l", "pt", "legal");
  //   doc.text(
  //     `List Summary Warehouse Transfer Tanggal ${moment().format("LL")}`,
  //     20,
  //     20
  //   );
  //   const index = 0;
  //   autoTable(doc, {
  //     theme: "striped",
  //     head: [
  //       ["N0", "No PO", "SN Machine", "Arrival Date", "Destination Warehouse"],
  //     ],
  //     headStyles: { fontSize: 7, halign: "center" },
  //     columnStyles: {
  //       0: { fontSize: 7, halign: "center" },
  //       1: { fontSize: 7, halign: "center" },
  //       2: { fontSize: 7, halign: "center" },
  //       3: { fontSize: 7, halign: "center" },
  //       4: { fontSize: 7, halign: "center" },
  //       5: { fontSize: 7, halign: "center" },
  //     },

  //     body: DataForBody,
  //     // body: [DataPDF, DataPDF],
  //   });
  //   doc.save(`Warehouse Transfer ${moment().format("LL")}.pdf`);
  // };
  // console.log(DataForBody, 'datapdf');

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    const columnWidth = 80; // Lebar kolom

    doc.text(`Summary Warehouse Transfer on ${moment().format('LL')}`, 20, 20);

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
        formattedSnMesins.join(''), // Menggabungkan dengan tanpa spasi
        item[2],
        item[4],
      ]);
    });

    const tableData = {
      head: [['No', 'No PO', 'SN Machine', 'Arrival Date', 'Destination Warehouse']],
      headStyles: { fontSize: 7, halign: 'center' },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
      },
      body: formattedData,
    };

    autoTable(doc, tableData);

    doc.save(`Summary Warehouse Transfer ${moment().format('LL')}.pdf`);
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
            <div className="flex pt-10 flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      SUMMARY OF WAREHOUSE TRANSFER
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        leftSidebarContent={
          <HandleFilter
            getUser={getUser}
            getAccessToken={getAccessToken}
            body={body}
            setBody={setBody}
          />
        }
        contentToolbar={
          <div className="flex flex-auto w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col   md:mt-0">
              {userRoles !== 'GUEST_RELATED' && (
                <div className="flex">
                  <div>
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
                        <HandleExportExcel datas={datas} listPO={id_po} />
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
                <TableSummaryWarehouse
                  propsFromParrentNew={propsFromParrentNew}
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

export default WarehouseTransperParent;
