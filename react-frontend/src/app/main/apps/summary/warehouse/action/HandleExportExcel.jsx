/* eslint-disable camelcase */
/* eslint-disable use-isnan */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-concat */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { Button } from '@mui/material';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';

const HandleExportExcel = (props) => {
  const datas = props?.datasLoop;
  const listPO = props?.listPO;
  const sumQuantityBeforeDelvivery = props?.sumQuantityBeforeDelvivery;
  const sumQuantityDelivery = props?.sumQuantityDelivery;
  const sumBalance = props?.sumBalance;
  const from_date = props?.from_date;
  const to_date = props?.to_date;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('SUMMARY WAREHOUSE');
    const worksheet = workbook.getWorksheet('SUMMARY WAREHOUSE');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'SUMMARY WAREHOUSE';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A3', 'B3');
    worksheet.getCell('A3').value = `${'NO PO:' + ' '}${
      listPO === null || listPO === undefined
        ? 'All PO'
        : listPO?.no_po_master
        ? listPO?.no_po_master
        : 'All PO'
    }`;

    worksheet.getCell('A3').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A4', 'B4');
    worksheet.getCell('A4').value = `${'Date:' + ' '}${moment().format('LL')}`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C3', 'D3');
    worksheet.getCell('C3').value = `${'SUM QTY BEFORE DELIVERY:' + ' '}${
      sumQuantityBeforeDelvivery === null ||
      sumQuantityBeforeDelvivery === undefined ||
      sumQuantityBeforeDelvivery === NaN
        ? '-'
        : sumQuantityBeforeDelvivery
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C4', 'D4');
    worksheet.getCell('C4').value = `${'SUM QTY DELIVERY:' + ' '}${
      sumQuantityDelivery === null ||
      sumQuantityDelivery === undefined ||
      sumQuantityDelivery === NaN
        ? '-'
        : sumQuantityDelivery
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('E3', 'F3');
    worksheet.getCell('E3').value = `${'SUM TOTAL BALANCE:' + ' '}${
      sumBalance === null || sumBalance === undefined || sumBalance === NaN ? '-' : sumBalance
    }`;
    worksheet.getCell('E3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('E4', 'F4');
    worksheet.getCell('E4').value = `Data from  ${
      from_date === null || '' || undefined ? '-' : moment(from_date).format('LL')
    } to ${to_date === null || '' || undefined ? '-' : moment(to_date).format('LL')}`;
    worksheet.getCell('E4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A6').value = 'NO';
    worksheet.getCell('A6').alignment = { horizontal: 'center' };

    worksheet.getCell('B6').value = 'NO PO';
    worksheet.getCell('B6').alignment = { horizontal: 'center' };

    worksheet.getCell('C6').value = 'CUSTOMER';
    worksheet.getCell('C6').alignment = { horizontal: 'center' };

    worksheet.getCell('D6').value = 'WAREHOUSE';
    worksheet.getCell('D6').alignment = { horizontal: 'center' };

    worksheet.getCell('E6').value = 'TYPE';
    worksheet.getCell('E6').alignment = { horizontal: 'center' };

    worksheet.getCell('F6').value = 'MODEL';
    worksheet.getCell('F6').alignment = { horizontal: 'center' };

    worksheet.getCell('G6').value = 'STYLE';
    worksheet.getCell('G6').alignment = { horizontal: 'center' };

    worksheet.getCell('H6').value = 'QUANTITY BEFORE DELIVERY';
    worksheet.getCell('H6').alignment = { horizontal: 'center' };

    worksheet.getCell('I6').value = 'QUANTITY DELIVERY';
    worksheet.getCell('I6').alignment = { horizontal: 'center' };

    worksheet.getCell('J6').value = 'TOTAL BALANCE';
    worksheet.getCell('J6').alignment = { horizontal: 'center' };

    worksheet.getCell('K6').value = 'STATUS MACHINE';
    worksheet.getCell('K6').alignment = { horizontal: 'center' };

    worksheet.getCell('L6').value = 'PROCESS';
    worksheet.getCell('L6').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 30 },
      { key: 'data_d', width: 50 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 30 },
      { key: 'data_h', width: 30 },
      { key: 'data_i', width: 20 },
      { key: 'data_j', width: 20 },
      { key: 'data_k', width: 20 },
      { key: 'data_l', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.no_po === null ? '-' : data?.no_po,
        data_c: data?.customer === null ? '-' : data?.customer,
        data_d: data?.warehouse === null ? '-' : data?.warehouse,
        data_e: data?.types === null ? '-' : data?.types,
        data_f: data?.models === null ? '-' : data?.models,
        data_g: data?.styles === null ? '-' : data?.styles,
        data_h: data?.qty_before_delivery,
        data_i: data?.qty_delivery,
        data_j: data?.qty_before_delivery - data?.qty_delivery,
        data_k: data?.status_mesin === '' ? '-' : data?.status_mesin,
        data_l: data?.process === '' ? '-' : data?.process,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Summary Warehouse ${moment().format('LL')}${fileExtension}`);
    })();
  }

  return (
    <div>
      <FuseAnimate animation="transition.slideLeftIn" delay={100}>
        <Button variant="contained" color="success" onClick={exportExcel}>
          <PrintIcon className="mr-2" />
          <div className="hidden md:contents">Export To Excel</div>
        </Button>
      </FuseAnimate>
    </div>
  );
};

export default HandleExportExcel;
