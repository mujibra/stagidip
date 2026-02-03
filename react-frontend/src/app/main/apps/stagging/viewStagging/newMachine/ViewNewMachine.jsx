/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable import/prefer-default-export */
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography, Button } from '@mui/material';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import HandleExportExcel from './HandleExportExcel1';
import TableViewNewMachine from './TableViewNewMachine';

function ViewNewMachine() {
  const getAccessToken = localStorage.getItem('access_token');
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}stagging/newMachine`, config)
      .then((res) => {
        // console.log(res, 'RES');
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
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
  };

  // function createData(
  //   id,
  //   no_po,
  //   tgl_po,
  //   status_po,
  //   part_number,
  //   model,
  //   status_mesin,
  //   tahun_produksi,
  //   customer,
  //   pic_staging,
  //   tgl_staging,
  //   jumlah,
  //   tgl_masuk,
  //   batch,
  //   brand,
  //   mesin,
  //   gudang,
  //   stok,
  //   total_transfer
  // ) {
  //   return {
  //     id,
  //     no_po,
  //     tgl_po,
  //     status_po,
  //     part_number,
  //     model,
  //     status_mesin,
  //     tahun_produksi,
  //     customer,
  //     pic_staging,
  //     tgl_staging,
  //     jumlah,
  //     tgl_masuk,
  //     batch,
  //     brand,
  //     mesin,
  //     gudang,
  //     stok,
  //     total_transfer,
  //   };
  // }
  function createData(
    no,
    no_po,
    status_po,
    tgl_po,
    customer,
    jumlah,
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
      jumlah,
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

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.no_po === null ? '-' : item?.no_po,
      moment(item?.tgl_po).format('YYYY-DD-MM'),
      item?.status_po === null ? '-' : item?.status_po,
      item?.customer === null ? '-' : item?.customer?.bank_desc,
      item?.jumlah,
      item?.model?.name,
      item?.mesin?.type,
      item?.brand,
      item?.batch?.name,
      item?.part_number,
      item?.sn_batch === null ? '-' : item?.sn_batch,
      item?.style === null ? '-' : item?.style,
      moment(item?.tahun_produksi).format('MMMM-YYYY'),
      item?.gudang?.gudang_desc,
      moment(item?.tgl_masuk).format('YYYY-DD-MM'),
      moment(item?.tgl_staging).format('YYYY-DD-MM'),
      item?.pic_staging?.name,
      item?.status_mesin
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
    doc.text(`List Staging New Machine Tanggal ${moment().format('LL')}`, 20, 20);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'N0',
          'No PO',
          'Purchase Order Date',
          'Status PO',
          'Customer',
          'Total',
          'Type',
          'Model',
          'Brand',
          'Batch',
          'PartNumber System',
          'SN Batch',
          'Style',
          'Production Year',
          'Warehouse',
          'Arrival Date',
          'Planned Staging Date',
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
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Download List Staging New Machine ${moment().format('LL')}.pdf`);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}stagging/newMachine`,
  //       config
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       // console.log(res);
  //       setData(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //       setData([]);
  //     });
  // }, []);
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
                    <Typography
                      className="sm:font-xl sm:flex mx-0 sm:mx-12 text-3xl font-bold"
                      variant="h1"
                    >
                      Staging
                    </Typography>
                    <Typography
                      className="mt-10 sm:font-xl sm:flex mx-0 sm:mx-12 text-xs"
                      variant="h5"
                    >
                      New Machine
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        // contentToolbar={<div>tes</div>}
        contentToolbar={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-full flex-col md:flex-row md:items-center md:mt-0">
              <div className="flex ">
                {(userRoles === 'SUPER_ADMIN' ||
                  userRoles === 'ADMIN' ||
                  userRoles === 'SUPERVISOR' ||
                  userRoles === 'OPERATOR_DIP' ||
                  userRoles === 'GUEST' ||
                  userRoles === 'GUEST_DIP' ||
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
                {/* <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <TextField
                    className="mb-10"
                    id="standard-textarea"
                    // label="Seacrh Machine"
                    placeholder="Search..."
                    // multiline
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FuseAnimate> */}
              </div>
            </div>
          </div>
        }
        content={
          <div>
            <TableViewNewMachine data={data} loading={loading} />
          </div>
        }
      />
    </div>
  );
}
export default withReducer('oldMachineApp')(ViewNewMachine);
