/* eslint-disable no-constant-condition */
/* eslint-disable no-else-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
import { Alert, AlertTitle, Button, Skeleton, Stack } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';
import { useDispatch } from 'react-redux';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

export const HandlePrint = (props) => {
  // console.log(props, 'props');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const model = props?.datas;
  // console.log(model, 'model cari');
  // console.log(data, 'data print');
  const dataHeader = props?.getRow;
  // console.log(dataHeader, 'dataheader');
  // console.log(data, 'props?.dataById');
  const idPo = props?.dataById?.id;
  const snMesin = props?.getIdMesin?.snMesin;
  const IdSnMesin = props?.getIdMesin?.idMesin;
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const [bodyPdf, setBodyPdf] = useState(null);
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const DataPDF = [];
  const body = {
    name: null,
  };

  const dataLopp = [];

  // console.log(bodyPdf, 'bodyPdf');

  function createData(
    no,
    customer,
    sn_mesin,
    ws_id,
    ws_name,
    type,
    model,
    gudang,
    received_date,
    staging,
    status_prestaging,
    status_preloading,
    delivery_date,
    installation_date
  ) {
    return {
      no,
      customer,
      sn_mesin,
      ws_id,
      ws_name,
      type,
      model,
      gudang,
      received_date,
      staging,
      status_prestaging,
      status_preloading,
      delivery_date,
      installation_date,
    };
  }
  const getData = async () => {
    setLoading(true);
    const response = axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getDetailMesinPerPo/${idPo}`, config)
      .then((res) => {
        setData(res?.data?.data);
        // setsumTotal((res?.data?.data).reduce((total, obj) => total + obj?.total, 0));
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
    getData();
  }, []);

  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.customer,
      item?.sn_mesin,
      item?.ws_id === null ? '-' : item?.ws_id,
      item?.ws_name === null ? '-' : item?.ws_name,
      item?.type,
      item?.model,
      item?.gudang,
      item?.received_date,
      item?.staging === false || true ? 'Done' : 'Done',
      item?.status_prestaging === 'N' ? 'In Progress' : 'Done',
      item?.status_preloading === 'N' ? 'In Progress' : 'Done',
      item?.delivery_date === '' ? '-' : moment(item?.delivery_date).format('LL'),
      item?.installation_date === null ? '-' : item?.installation_date
    )
  );

  console.log(datas, ' datassssss');
  const DataForBody = [];

  for (let index = 0; index < datas?.length; index++) {
    if (datas?.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }

  // TAMBAH PO, SNMESIN, APPROVAL

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    // doc.text(
    //   `Detail Purchase Order SN-Machine : "${props?.getIdMesin?.snMesin}"  Date ${moment().format(
    //     'LL'
    //   )}`,
    //   20,
    //   20
    // );
    doc.text(
      `Detail Purchase Order 
      `,
      20,
      20
    );
    doc.setFontSize(10);
    // doc.text(
    //   `Part Number  : ${
    //     dataHeader?.pn_system === null ? '-' : dataHeader?.pn_system
    //   }`,
    //   20,
    //   40
    // );
    // doc.text(
    //   `Customer     : ${
    //     dataHeader?.customer?.bank_desc === undefined
    //       ? '-'
    //       : dataHeader?.customer?.bank_desc
    //   }`,
    //   20,
    //   55
    // );
    // doc.text(
    //   `Type         : ${
    //     dataHeader?.mesin?.type === undefined ? '-' : dataHeader?.mesin?.type
    //   }`,
    //   20,
    //   70
    // );
    // doc.text(
    //   `Model        : ${
    //     dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name
    //   }`,
    //   20,
    //   85
    // );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'No',
          'Customer',
          'SN Mesin',
          'WS ID',
          'WS Name',
          'Type',
          'Model',
          'Warehouse',
          'Receive Date',
          'Staging Status',
          'Pre Staging Status',
          'Pre Loading Status',
          'Delivery Status',
          'Installation Date',
        ],
      ],
      headStyles: { fontSize: 7, halign: 'center' },
      margin: { top: 50 },
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
      },

      body: DataForBody,
    });
    doc.save(`Detail Purchase Order`);
  };

  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Detail Purchase Order');
    const worksheet = workbook.getWorksheet('Detail Purchase Order');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = `Detail Purchase Order`;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    /* Header Table */
    worksheet.getCell('A3').value = 'NO';
    worksheet.getCell('A3').alignment = { horizontal: 'center' };

    worksheet.getCell('B3').value = 'Customer';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };

    worksheet.getCell('C3').value = 'SN Mesin';
    worksheet.getCell('C3').alignment = { horizontal: 'center' };

    worksheet.getCell('D3').value = 'WS ID';
    worksheet.getCell('D3').alignment = { horizontal: 'center' };
    worksheet.getCell('E3').value = 'WS Name';
    worksheet.getCell('E3').alignment = { horizontal: 'center' };
    worksheet.getCell('F3').value = ' Type';
    worksheet.getCell('F3').alignment = { horizontal: 'center' };
    worksheet.getCell('G3').value = 'Model';
    worksheet.getCell('G3').alignment = { horizontal: 'center' };
    worksheet.getCell('H3').value = 'Warehouse';
    worksheet.getCell('H3').alignment = { horizontal: 'center' };
    worksheet.getCell('I3').value = 'Receive Date';
    worksheet.getCell('I3').alignment = { horizontal: 'center' };
    worksheet.getCell('J3').value = 'Staging Status';
    worksheet.getCell('J3').alignment = { horizontal: 'center' };
    worksheet.getCell('K3').value = 'Pre Staging Status';
    worksheet.getCell('K3').alignment = { horizontal: 'center' };
    worksheet.getCell('L3').value = 'Pre Loading Status';
    worksheet.getCell('L3').alignment = { horizontal: 'center' };
    worksheet.getCell('M3').value = 'Delivery Status';
    worksheet.getCell('M3').alignment = { horizontal: 'center' };
    worksheet.getCell('N3').value = 'Installation Date';
    worksheet.getCell('N3').alignment = { horizontal: 'center' };

    /* Column headers */
    // worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 12 },
      { key: 'data_d', width: 12 },
      { key: 'data_e', width: 53 },
      { key: 'data_f', width: 6 },
      { key: 'data_g', width: 12 },
      { key: 'data_h', width: 45 },
      { key: 'data_i', width: 15 },
      { key: 'data_j', width: 15 },
      { key: 'data_k', width: 15 },
      { key: 'data_l', width: 15 },
      { key: 'data_m', width: 15 },
      { key: 'data_n', width: 15 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
    and calling worksheet.addRow()
    */
    datas.forEach(function (data, index) {
      // console.log(data, 'data');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.customer,
        data_c: data?.sn_mesin,
        data_d: data?.ws_id,
        data_e: data?.ws_name,
        data_f: data?.type,
        data_g: data?.model,
        data_h: data?.gudang,
        data_i: data?.received_date,
        data_j: data?.staging,
        data_k: data?.status_prestaging,
        data_l: data?.status_preloading,
        data_m: data?.delivery_date,
        data_n: data?.installation_date,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Detail Purchase Order ${fileExtension}`);
    })();
  }

  return (
    <div>
      {loading === true ? (
        <Stack spacing={1}>
          <Skeleton className="rounded-6" variant="rectangular" width={250} height={70} />
          <div className="flex justify-center gap-5">
            <Skeleton className="rounded-full" variant="rounded" width={120} height={40} />
            <Skeleton className="rounded-full" variant="rounded" width={120} height={40} />
          </div>
        </Stack>
      ) : (
        <div>
          <Alert className="mb-10" severity={datas?.length === 0 ? 'warning' : 'success'}>
            <AlertTitle>
              {data?.length === 0
                ? 'Please enter the data "SN-Mesin" in staging first!!'
                : 'Quantity'}
            </AlertTitle>
            Quantity Staging — <strong>{props?.dataById?.jml_mesin_staging}</strong>
          </Alert>
          <div className="flex justify-center">
            <Button
              color="success"
              disabled={datas?.length === 0}
              onClick={downloadPDF}
              variant="contained"
            >
              <PrintIcon className="mr-2" />
              Export PDF
            </Button>
            <Button
              color="primary"
              disabled={datas?.length === 0}
              onClick={exportExcel}
              variant="contained"
            >
              <PrintIcon className="mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
