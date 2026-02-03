/* eslint-disable radix */
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
import TableDevelopmentSummary from './TableDevelopmentSummary';
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

const SummaryDevelopmentParent = (props) => {
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
  const [sumQuantityDelvivery, setsumQuantityDelvivery] = useState(0);
  const [sumQuantityWithdrawal, setsumQuantityWithdrawal] = useState(0);
  const [sumBalance, setsumBalance] = useState(0);
  const [id_po, setid_po] = useState(null);
  const [customer, setcustomer] = useState(null);
  const [models, setmodels] = useState(null);
  const [id_type_mesin, setid_type_mesin] = useState(null);
  const [nama_gudang, setnama_gudang] = useState(null);
  const [styles, setstyles] = useState(null);
  const [status_mesin, setstatus_mesin] = useState('');
  const [process_wr, setprocess_wr] = useState('');
  const [from_date, setfrom_date] = useState(null);
  const [to_date, setto_date] = useState(null);
  // console.log(id_po);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const nullCondition = null || undefined || '';
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
    customer,
    models,
    nama_gudang,
    id_type_mesin,
    styles,
    status_mesin,
    process_wr,
    from_date: moment(from_date).format('YYYY-MM-DD'),
    to_date: moment(to_date).format('YYYY-MM-DD'),
  };
  const setBody = {
    setid_po,
    setmodels,
    setnama_gudang,
    setid_type_mesin,
    setcustomer,
    setstyles,
    setstatus_mesin,
    setprocess_wr,
    setfrom_date,
    setto_date,
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(`${api}getDevelopmentSummary`, config)
        .then((res) => {
          setData(res?.data?.data);
          setsumQuantityDelvivery(
            (res?.data?.data).reduce((total, obj) => total + parseInt(obj?.QTY_DELIV), 0)
          );
          setsumQuantityWithdrawal(
            (res?.data?.data).reduce((total, obj) => total + parseInt(obj?.QTY_WITHDRAW), 0)
          );
          setsumBalance(
            (res?.data?.data).reduce((total, obj) => total + parseInt(obj?.QTY_DELIV), 0) -
              (res?.data?.data).reduce((total, obj) => total + parseInt(obj?.QTY_WITHDRAW), 0)
          );
          setLoading(false);
          // console.log(res?.data?.data, 'datas');
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
  }, []);
  // }, [
  //   customer,
  //   nama_gudang,
  //   models,
  //   id_type_mesin,
  //   styles,
  //   status_mesin,
  //   process_wr,
  //   body?.from_date,
  //   body?.to_date,
  // ]);
  // console.log(model);

  function createData(
    no,
    customer,
    purpose,
    types,
    models,
    QTY_DELIV,
    QTY_WITHDRAW,
    total_balance,
  ) {
    return {
      no,
      customer,
      purpose,
      types,
      models,
      QTY_DELIV,
      QTY_WITHDRAW,
      total_balance,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      // item?.id,
      item?.customer_name === null ? '-' : item?.customer_name,
      item?.purpose === null ? '-' : item?.purpose,
      item?.types === null ? '-' : item?.types,
      item?.models === null ? '-' : item?.models,
      parseInt(item?.QTY_DELIV),
      parseInt(item?.QTY_WITHDRAW),
      parseInt(item?.QTY_DELIV - item?.QTY_WITHDRAW),
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
    doc.text(`List Summary Development on ${moment().format('LL')}`, 20, 20);
    doc.setFontSize(10);
    doc.text(
      `Sum Quantity Delivery  : ${
        sumQuantityDelvivery === null || '' || undefined || NaN
          ? '-'
          : sumQuantityDelvivery
      }`,
      20,
      40
    );
    doc.text(
      `Sum Quantity Withdrawal     : ${
        sumQuantityWithdrawal === null || '' || undefined || NaN ? '-' : sumQuantityWithdrawal
      }`,
      20,
      55
    );
    doc.text(
      `Sum Balance         : ${sumBalance === null || '' || undefined || NaN ? '-' : sumBalance}`,
      20,
      70
    );
    // doc.text(
    //   `Data from  ${
    //     from_date === null || '' || undefined ? '-' : moment(from_date).format('LL')
    //   } to ${
    //     to_date === null || '' || undefined ? '-' : moment(to_date).format('LL')
    //   }`,
    //   250,
    //   40
    // );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 95 },
      head: [
        [
          'No',
          'Customer',
          'Purpose',
          'Type',
          'Model',
          'Quantity Delivery',
          'Quantity Withdrawal',
          'Total Balance',
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
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Download Summary Development ${moment().format('LL')}.pdf`);
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
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className=" sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      SUMMARY DEVELOPMENT
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
                          sumQuantityDelvivery={sumQuantityDelvivery}
                          sumQuantityWithdrawal={sumQuantityWithdrawal}
                          sumBalance={sumBalance}
                          from_date={from_date}
                          to_date={to_date}
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
                <TableDevelopmentSummary
                  userRoles={userRoles}
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  sumQuantityDelvivery={sumQuantityDelvivery}
                  sumQuantityWithdrawal={sumQuantityWithdrawal}
                  sumBalance={sumBalance}
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

export default SummaryDevelopmentParent;
