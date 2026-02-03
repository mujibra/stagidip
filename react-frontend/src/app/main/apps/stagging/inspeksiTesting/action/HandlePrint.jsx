/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const HandlePrint = props => {
  // console.log(props, 'props');
  const dataPO = props?.data;
  const idPo = props?.idPO;
  const snMesin = props?.getIdMesin?.snMesin;
  const IdSnMesin = props?.getIdMesin?.idMesin;
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then(res => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };
  props.propsFromParrent(1, props.getIdMesin);
  const [data, setData] = useState([]);
  const [dataMoverApprl, setdataMoverApprl] = useState({});
  const [dataDantindoUpprl, setdataDantindoUpprl] = useState({});
  const [dataTSSUpprl, setdataTSSUpprl] = useState({});
  // console.log(dataDantindoUpprl, 'dataDantindoUpprl');
  const [loading, setLoading] = useState(true);
  const getDataMover = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/approval/MOVER/${idPo}/${IdSnMesin}`,
        config
      )
      .then(res => {
        const datas = res?.data?.data[0];
        // console.log(datas, 'data');
        setdataMoverApprl({
          data: datas,
          gudang: datas?.gudang,
          id: datas?.id,
          picMover: datas?.pic_mover,
        });
        // console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        setdataMoverApprl({});
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
      });
  };
  const getDataDatindo = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/approval/DATINDO/${idPo}/${IdSnMesin}`,
        config
      )
      .then(res => {
        const datas = res?.data?.data[0];
        // console.log(datas, 'data');
        setdataDantindoUpprl({
          data: datas,
          created_at: datas?.created_at,
          id: datas?.id,
          name: datas?.name,
        });
        // console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        setdataDantindoUpprl({});
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
      });
  };
  const getDataTSS = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/approval/TSS/${idPo}/${IdSnMesin}`,
        config
      )
      .then(res => {
        const datas = res?.data?.data[0];
        // console.log(datas, 'data');
        setdataTSSUpprl({
          data: datas,
          created_at: datas?.created_at,
          id: datas?.id,
          name: datas?.name,
        });
        // console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        setdataTSSUpprl({});
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
      });
  };

  const getDataById = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${props?.getIdMesin?.idMesin}`,
        config
      )
      .then(res => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch(err => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
      });
  };
  // console.log(datas, 'datas');
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getDataById();
      getDataDatindo();
      getDataMover();
      getDataTSS();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  const DataPDF = [];

  function createData(no, general_desc, position, quantity, sn_mesin, status) {
    return {
      no,
      general_desc,
      position,
      quantity,
      sn_mesin,
      status,
      // detail_inspeksi,
    };
  }
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.general_desc,
      item?.detail_inspeksi?.position === null
        ? '-'
        : item?.detail_inspeksi?.position,
      item?.detail_inspeksi?.quantity === null
        ? '-'
        : item?.detail_inspeksi?.quantity,
      item?.detail_inspeksi?.status === null
        ? '-'
        : item?.detail_inspeksi?.status,
      item?.detail_inspeksi?.keterangan === null
        ? '-'
        : item?.detail_inspeksi?.keterangan
    )
  );
  const DataForBody = [];
  // console.log(DataForBody);

  for (let index = 0; index < datas.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }

  // TAMBAH PO, SNMESIN, APPROVAL

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(
      `Pre Loading Inspection SN-Machine : "${
        props?.getIdMesin?.snMesin
      }"  Date ${moment().format('LL')}`,
      20,
      20
    );
    doc.setFontSize(10);
    doc.text(
      `No PO.                          : ${
        dataPO?.no_po === null ? '-' : dataPO?.no_po
      }`,
      20,
      40
    );
    doc.text(
      `Upproval BY DATINDO : ${
        dataDantindoUpprl?.name === undefined ? '-' : dataDantindoUpprl?.name
      }`,
      20,
      55
    );
    doc.text(
      `Upproval BY TSS          : ${
        dataTSSUpprl?.name === undefined ? '-' : dataTSSUpprl?.name
      }`,
      20,
      70
    );
    doc.text(
      `Upproval BY MOVER    : ${
        dataMoverApprl?.picMover === undefined ? '-' : dataMoverApprl?.picMover
      }`,
      20,
      85
    );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'N0',
          'Description Umum',
          'Diluar/Didalam',
          'Jumlah',
          'OK/NG',
          'Keterangan',
        ],
      ],
      headStyles: { fontSize: 7, halign: 'center' },
      margin: { top: 95 },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
    });
    doc.save(
      `Pre Loading Inspection SN-MESIN_${snMesin} ${moment().format('LL')}.pdf`
    );
  };
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('PRE LOADING INSPECTION');
    const worksheet = workbook.getWorksheet('PRE LOADING INSPECTION');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = `Pre Loading Inspection SN-Machine : "${
      props?.getIdMesin?.snMesin
    }"  Date ${moment().format('LL')}`;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A3', 'G3');
    worksheet.getCell('A3').value = `No PO : ${
      dataPO?.no_po === null ? '-' : dataPO?.no_po
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A4', 'G4');
    worksheet.getCell('A4').value = `Upproval BY DATINDO : ${
      dataDantindoUpprl?.name === undefined ? '-' : dataDantindoUpprl?.name
    }`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A5', 'G5');
    worksheet.getCell('A5').value = `Upproval BY TSS : ${
      dataTSSUpprl?.name === undefined ? '-' : dataTSSUpprl?.name
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A6', 'G6');
    worksheet.getCell('A6').value = `Upproval BY MOVER    : ${
      dataMoverApprl?.picMover === undefined ? '-' : dataMoverApprl?.picMover
    }`;
    worksheet.getCell('A6').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A8').value = 'NO';
    worksheet.getCell('A8').alignment = { horizontal: 'center' };

    worksheet.getCell('B8').value = 'Description Umum';
    worksheet.getCell('B8').alignment = { horizontal: 'center' };

    worksheet.getCell('C8').value = 'Diluar/Didalam';
    worksheet.getCell('C8').alignment = { horizontal: 'center' };

    worksheet.getCell('D8').value = 'Jumlah';
    worksheet.getCell('D8').alignment = { horizontal: 'center' };

    worksheet.getCell('E8').value = 'OK/NG';
    worksheet.getCell('E8').alignment = { horizontal: 'center' };

    worksheet.getCell('F8').value = 'Keterangan';
    worksheet.getCell('F8').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 40 },
      { key: 'data_c', width: 15 },
      { key: 'data_d', width: 15 },
      { key: 'data_e', width: 15 },
      { key: 'data_f', width: 40 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      // console.log(data, 'data');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.general_desc,
        data_c: data?.position,
        data_d: data?.quantity,
        data_e: data?.sn_mesin,
        data_f: data?.status,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(
        blob,
        `Pre Loading Inspection SN-MESIN_${snMesin} ${moment().format(
          'LL'
        )}${fileExtension}`
      );
    })();
  }

  return (
    <div className="flex justify-center">
      <Button
        color="success"
        onClick={downloadPDF}
        variant="contained"
        disabled={loading === true}
      >
        <PrintIcon className="mr-2" />
        Export PDF
      </Button>
      <Button
        color="primary"
        onClick={exportExcel}
        variant="contained"
        disabled={loading === true}
      >
        <PrintIcon className="mr-2" />
        Export Excel
      </Button>
    </div>
  );
};
