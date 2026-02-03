/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
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
import { HandleFilter } from './action/HandleFilter';
import TableImplementation from './TableImplementation';
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

const ImplementationTableParent = (props) => {
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
  const [id_po, setid_po] = useState('');
  const [customer, setcustomer] = useState('');
  const [nama_gudang, setnama_gudang] = useState(null);
  const [from_date, setfrom_date] = useState(null);
  const [to_date, setto_date] = useState(null);
  // const [batch, setbatch] = useState('');
  // const [model, setmodel] = useState('');
  // const [id_type_mesin, setid_type_mesin] = useState('');
  // const [nama_gudang, setnama_gudang] = useState('');
  // const [tgl_tiba, settgl_tiba] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [sumQuantity, setsumQuantity] = useState(0);
  const [sumTotalDelivery, setsumTotalDelivery] = useState(0);
  const [averagePercenDelivery, setaveragePercenDelivery] = useState(0);
  const [sumTotalActivation, setsumTotalActivation] = useState(0);
  const [sumTotalBA, setsumTotalBA] = useState(0);
  const [averagePercenBA, setaveragePercenBA] = useState(0);
  const [sumBANA, setsumBANA] = useState(0);
  const [sumNotDelivery, setsumNotDelivery] = useState(0);
  const [averagePercenActivation, setaveragePercenActivation] = useState(0);
  const [sumActivationNA, setsumActivationNA] = useState(0);
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
    nama_gudang,
    from_date: moment(from_date).format('YYYY-MM-DD'),
    to_date: moment(to_date).format('YYYY-MM-DD'),
    // id_type_mesin,
    // model,
  };
  const setBody = {
    setid_po,
    setcustomer,
    setnama_gudang,
    setfrom_date,
    setto_date,
    // setid_type_mesin,
    // setmodel,
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}implement-summary-v2/${
            body?.id_po?.id === undefined ? null : body?.id_po?.id
          }/${body?.customer === '' || body?.customer === undefined ? null : body?.customer}/${
            from_date === null ? null : moment(body?.from_date).format('YYYY-MM-DD')
          }/${to_date === null ? null : moment(body?.to_date).format('YYYY-MM-DD')}`,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken}`,
            },
          }
        )
        .then((res) => {
          setData(res?.data?.data);
          setsumQuantity(
            (res?.data?.data).reduce(
              (total, obj) => total + parseInt(obj?.quantity === null ? 0 : obj?.quantity),
              0
            )
          );
          setsumTotalDelivery(
            (res?.data?.data).reduce(
              (total, obj) => total + parseInt(obj?.total_kirim === null ? 0 : obj?.total_kirim),
              0
            )
          );
          // setaveragePercenDelivery
          setsumTotalActivation(
            (res?.data?.data).reduce((total, obj) => total + obj?.total_activated, 0)
          );
          setsumTotalBA((res?.data?.data).reduce((total, obj) => total + obj?.total_ba, 0));
          // setaveragePercenBA
          setsumBANA(
            (res?.data?.data).reduce(
              (total, obj) => total + (obj?.total_activated - obj?.total_ba),
              0
            )
          );
          setsumNotDelivery(
            (res?.data?.data).reduce((total, obj) => total + (obj?.quantity - obj?.total_kirim), 0)
          );
          // setaveragePercenActivation
          setsumActivationNA(
            (res?.data?.data).reduce(
              (total, obj) => total + (obj?.total_kirim - obj?.total_activated),
              0
            )
          );
          setLoading(false);
          // console.log(res.data?.data, 'data');
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
  }, [id_po, body?.customer, body?.nama_gudang, body?.from_date, body?.to_date]);

  function createData(
    no,
    no_po,
    customer_name,
    quantity,
    type_mesin,
    total_kirim,
    persen_kirim,
    total_activated,
    total_ba,
    persen_ba,
    ba_na,
    no_delivery,
    persen_activation,
    activation_na
  ) {
    return {
      no,
      no_po,
      customer_name,
      quantity,
      type_mesin,
      total_kirim,
      persen_kirim,
      total_activated,
      total_ba,
      persen_ba,
      ba_na,
      no_delivery,
      persen_activation,
      activation_na,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.no_po,
      item?.customer_name,
      item?.quantity === null ? 0 : item?.quantity,
      item?.type_mesin,
      item?.total_kirim === null ? 0 : item?.total_kirim,
      item?.persen_kirim === null ? `0%` : `${item?.persen_kirim}%`,
      item?.total_activated === null ? 0 : item?.total_activated,
      item?.total_ba === null ? 0 : item?.total_ba,
      item?.persen_ba === null ? `0%` : `${item?.persen_ba}%`,
      (item?.total_activated === null ? 0 : item?.total_activated) -
        (item?.total_ba === null ? 0 : item?.total_ba),
      (item?.quantity === null ? 0 : item?.quantity) -
        (item?.total_kirim === null ? 0 : item?.total_kirim),
      `${
        Math.round(
          ((item?.total_activated === null ? 0 : item?.total_activated) * 100) /
            (item?.quantity === null ? 0 : item?.quantity)
        ) === Infinity ||
        isNaN(
          Math.round(
            ((item?.total_activated === null ? 0 : item?.total_activated) * 100) /
              (item?.quantity === null ? 0 : item?.quantity)
          )
        ) === true
          ? 0
          : Math.round(
              ((item?.total_activated === null ? 0 : item?.total_activated) * 100) /
                (item?.quantity === null ? 0 : item?.quantity)
            )
      }%`,
      (item?.total_kirim === null ? 0 : item?.total_kirim) -
        (item?.total_activated === null ? 0 : item?.total_activated)
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
    doc.text(`List Summary Implementation on ${moment().format('LL')}`, 20, 20);
    doc.setFontSize(10);
    doc.text(
      `Sum Quantity  : ${sumQuantity === null || '' || undefined || NaN ? '-' : sumQuantity}`,
      20,
      40
    );
    doc.text(
      `Sum Total Delivery   : ${
        sumTotalDelivery === null || '' || undefined || NaN ? '-' : sumTotalDelivery
      }`,
      20,
      55
    );
    doc.text(
      `Sum Total Activation        : ${
        sumTotalActivation === null || '' || undefined || NaN ? '-' : sumTotalActivation
      }`,
      20,
      70
    );
    doc.text(
      `Sum Total BA        : ${sumTotalBA === null || '' || undefined || NaN ? '-' : sumTotalBA}`,
      20,
      85
    );
    doc.text(
      `Sum BA No Available        : ${sumBANA === null || '' || undefined || NaN ? '-' : sumBANA}`,
      250,
      40
    );
    doc.text(
      `Sum No Delivery        : ${
        sumNotDelivery === null || '' || undefined || NaN ? '-' : sumNotDelivery
      }`,
      250,
      55
    );
    doc.text(
      `Sum Activation No Available       : ${
        sumActivationNA === null || '' || undefined || NaN ? '-' : sumActivationNA
      }`,
      250,
      70
    );
    doc.text(
      `Data from  ${
        from_date === null || '' || undefined ? '-' : moment(from_date).format('LL')
      } to ${to_date === null || '' || undefined ? '-' : moment(to_date).format('LL')}`,
      250,
      85
    );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 105 },
      head: [
        [
          'No',
          'No PO',
          'Customer',
          'Quantity',
          'Type',
          'Total Delivery',
          '% Delivery',
          'Total Activation',
          'Total BA',
          '% BA',
          'BA No Available',
          'No Delivery',
          '% Activation',
          'Activation No Available',
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
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Summary Implementation ${moment().format('LL')}.pdf`);
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
                      IMPLEMENTATION TABLE
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
                      datas={datas}
                      listPO={id_po}
                      sumQuantity={sumQuantity}
                      sumTotalDelivery={sumTotalDelivery}
                      sumTotalActivation={sumTotalActivation}
                      sumTotalBA={sumTotalBA}
                      sumBANA={sumBANA}
                      sumNotDelivery={sumNotDelivery}
                      sumActivationNA={sumActivationNA}
                      from_date={from_date}
                      to_date={to_date}
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
              <div>
                <TableImplementation
                  userRoles={userRoles}
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  // getData={getData}
                  handleClose={handleClose}
                  sumQuantity={sumQuantity}
                  sumTotalDelivery={sumTotalDelivery}
                  sumTotalActivation={sumTotalActivation}
                  sumTotalBA={sumTotalBA}
                  sumBANA={sumBANA}
                  sumNotDelivery={sumNotDelivery}
                  sumActivationNA={sumActivationNA}
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

export default ImplementationTableParent;
