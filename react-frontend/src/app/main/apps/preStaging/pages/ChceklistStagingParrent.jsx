/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

import { Typography, Button } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import jsPDF from 'jspdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import HandleExportExcel from '../action/HandleExportExcel1';
import TableChecklistStaging from './TableChecklistStaging';

const useStyles = makeStyles(theme => ({
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

const ChceklistStagingParrent = props => {
  // console.log(props, 'prossss');
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();
  const [data, setData] = useState([]);
  // console.log(data, 'data');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(`${api}purchaseOrder/${userRolesId}`, config)
      .then(res => {
        // console.log(res, 'RES');
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch(err => {
        setData([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.errorMessage;
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

  function createData(
    no,
    no_po,
    status_po,
    tgl_po,
    customer,
    total_transfer,
    jumlah,
    jml_mesin_checklist,
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
      jml_mesin_checklist,
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
      item?.status_po === null ? '-' : item?.status_po,
      moment(item?.tgl_po).format('YYYY-DD-MM'),
      item?.customer === null ? '-' : item?.customer?.bank_desc,
      item?.jumlah,
      item?.jumlah - item?.total_transfer,
      item?.jml_mesin_checklist,
      item?.model?.name,
      item?.mesin?.type,
      item?.brand,
      item?.batch?.name,
      item?.part_number,
      item?.sn_batch === null ? '-' : item?.sn_batch,
      item?.style === null ? '-' : item?.style?.name,
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
    doc.text(`List Pre Staging Tanggal ${moment().format('LL')}`, 20, 20);
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
    doc.save(`Download Pre Staging ${moment().format('LL')}.pdf`);
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
            <div className="flex pb-10 items-center">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography
                  className="flex items-left mt-20 sm:mb-12 flex-col"
                  color="inherit"
                >
                  <Typography className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xl">
                    <p>Pre Staging Checklist</p>
                  </Typography>
                  <Typography className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xs">
                    <p>Checklist</p>
                  </Typography>
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        contentToolbar={
          <div className="flex flex-1 w-full items-center ">
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
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TableChecklistStaging
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                />
              </div>
            </div>
          </FuseAnimate>
        }
      />
    </div>
  );
};

export default ChceklistStagingParrent;
