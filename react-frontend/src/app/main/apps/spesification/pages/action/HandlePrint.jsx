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
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';
import { useDispatch } from 'react-redux';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { useState } from 'react';

export const HandlePrint = (props) => {
  const data = props?.dataDetail;
  // console.log(data, 'props');
  const model = props?.datas;
  // console.log(model, 'model cari');
  // console.log(data, 'data print');
  const dataHeader = props?.getRow;
  // console.log(dataHeader?.model, 'dataheader');
  // console.log(data, 'datafromprint');
  const idPo = props?.idPO;
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

  // console.log(bodyPdf, 'bodyPdf');

  function createData(no, item, description, result) {
    return {
      no,
      item,
      description,
      result,
    };
  }
  // if (bodyPdf !== null) {
  const datas = data?.map((item, index) =>
    createData(
      index + 1,
      item?.parent === null ? '-' : item?.parent,
      item?.data_item?.map((item) =>
        item?.item_selected === undefined ? null : item?.item_selected
      ),
      item?.results === null ? '-' : item?.results
    )
  );
  // console.log(datas, 'datas');
  // }
  const DataForBody = [];
  const DataForBodyStep2 = [];
  const DataForBodyStep3 = [];

  for (let index = 0; index < datas?.length; index++) {
    for (let idx = 0; idx < datas[index]?.description?.length; index++) {
      if (datas?.length !== 0) {
        DataForBody.push(
          Object.values(datas[index]?.description.map((item) => item?.description) || {})
        );
        // DataForBody.push(Object.values(datas[index]?.description[idx]?.description || {}));
      }
    }
  }
  for (let i = 0; i < DataForBody.length; i++) {
    DataForBodyStep2.push(DataForBody[i].join(' '));
  }
  for (let i = 0; i < DataForBodyStep2.length; i++) {
    DataForBody[i].unshift(
      i + 1,
      datas[i]?.item,
      DataForBodyStep2[i].trim() === '' ? '-' : DataForBodyStep2[i].trim(),
      datas[i]?.result
    );
  }
  for (let i = 0; i < DataForBody.length; i++) {
    DataForBodyStep3.push(DataForBody[i].slice(0, 4));
  }

  // TAMBAH PO, SNMESIN, APPROVAL
  // console.log(DataForBodyStep2, 'DataForBodyStep2');

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    // doc.text(
    //   `Specification SN-Machine : "${props?.getIdMesin?.snMesin}"  Date ${moment().format(
    //     'LL'
    //   )}`,
    //   20,
    //   20
    // );
    doc.text(
      `Specification No PO  : ${
        dataHeader?.detail_po?.no_po === null ? '-' : dataHeader?.detail_po?.no_po
      }`,
      20,
      20
    );
    doc.setFontSize(10);
    doc.text(
      `Part Number  : ${dataHeader?.pn_system === null ? '-' : dataHeader?.pn_system}`,
      20,
      40
    );
    doc.text(
      `Approval Staging  : ${
        dataHeader?.approval_staging?.name === undefined ? '-' : dataHeader?.approval_staging?.name
      }`,
      200,
      40
    );
    doc.text(
      `Approval TSS   : ${
        dataHeader?.approval_tss?.name === undefined ? '-' : dataHeader?.approval_tss?.name
      }`,
      200,
      55
    );
    doc.text(
      `Customer     : ${
        dataHeader?.customer?.bank_desc === undefined ? '-' : dataHeader?.customer?.bank_desc
      }`,
      20,
      55
    );
    doc.text(
      `Type         : ${dataHeader?.mesin?.type === undefined ? '-' : dataHeader?.mesin?.type}`,
      20,
      70
    );
    doc.text(
      `Model        : ${dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name}`,
      200,
      70
    );
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [['No', 'Item', 'Description', 'Result']],
      headStyles: { fontSize: 7, halign: 'center' },
      margin: { top: 95 },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
      },

      body: DataForBodyStep3,
    });
    doc.save(`Specification No PO ${dataHeader?.detail_po?.no_po} on ${moment().format('LL')}.pdf`);
  };

  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('SPECIFICATION');
    const worksheet = workbook.getWorksheet('SPECIFICATION');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = `Specification No PO : "
    ${dataHeader?.detail_po?.no_po}
    "  Date ${moment().format('LL')}`;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A3', 'B3');
    worksheet.getCell('A3').value = `Part Number :${
      dataHeader?.pn_system === undefined ? '-' : dataHeader?.pn_system
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A4', 'B4');
    worksheet.getCell('A4').value = `Customer : ${
      dataHeader?.customer?.bank_desc === undefined ? '-' : dataHeader?.customer?.bank_desc
    }`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A5', 'B5');
    worksheet.getCell('A5').value = `Type : ${
      dataHeader?.mesin?.type === undefined ? '-' : dataHeader?.mesin?.type
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C5', 'D5');
    worksheet.getCell('C5').value = `Model    : ${
      dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name
    }`;
    worksheet.getCell('C5').alignment = { horizontal: 'left' };
    worksheet.mergeCells('C3', 'D3');
    worksheet.getCell('C3').value = `Approval Staging    : ${
      dataHeader?.approval_staging?.name === undefined ? '-' : dataHeader?.approval_staging?.name
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };
    worksheet.mergeCells('C4', 'D4');
    worksheet.getCell('C4').value = `Approval Staging    : ${
      dataHeader?.approval_tss?.name === undefined ? '-' : dataHeader?.approval_tss?.name
    }`;
    worksheet.getCell('C4').alignment = { horizontal: 'left' };

    // worksheet.mergeCells('A7', 'G7');
    // worksheet.getCell('A7').value = `Part Number    : ${
    //   dataHeader?.pn_system === undefined ? '-' : dataHeader?.pn_system
    // }`;
    // worksheet.getCell('A7').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A9').value = 'NO';
    worksheet.getCell('A9').alignment = { horizontal: 'center' };

    worksheet.getCell('B9').value = 'Item';
    worksheet.getCell('B9').alignment = { horizontal: 'center' };

    worksheet.getCell('C9').value = 'Description';
    worksheet.getCell('C9').alignment = { horizontal: 'center' };

    worksheet.getCell('D9').value = 'Result';
    worksheet.getCell('D9').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 40 },
      { key: 'data_d', width: 15 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    data.forEach(function (data, index) {
      // console.log(data, 'data');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.parent === null ? '-' : data?.parent,
        data_c: DataForBodyStep2[index] === '' ? '-' : DataForBodyStep2[index],
        data_d: data?.results === null ? '-' : data?.results,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(
        blob,
        `Specification No PO_${dataHeader?.detail_po?.no_po} ${moment().format(
          'LL'
        )}${fileExtension}`
      );
    })();
  }

  return (
    <div className="flex justify-center">
      <Button color="success" onClick={downloadPDF} variant="contained">
        <PrintIcon className="mr-2" />
        Export PDF
      </Button>
      <Button color="primary" onClick={exportExcel} variant="contained">
        <PrintIcon className="mr-2" />
        Export Excel
      </Button>
    </div>
  );
};
