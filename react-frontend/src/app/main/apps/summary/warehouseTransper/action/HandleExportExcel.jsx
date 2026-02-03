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
  const datas = props?.datas;
  const listPO = props?.listPO;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('SUMMARY WAREHOUSE TRANSFER');
    const worksheet = workbook.getWorksheet('SUMMARY WAREHOUSE TRANSFER');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'SUMMARY WAREHOUSE TRANSFER';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A3', 'G3');
    worksheet.getCell('A3').value = `${'NO PO:' + ' '}${
      listPO === null ? 'All PO' : listPO?.no_po_master
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A4', 'G4');
    worksheet.getCell('A4').value = `${'Date:' + ' '}${moment().format('LL')}`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A6').value = 'NO';
    worksheet.getCell('A6').alignment = { horizontal: 'center' };

    worksheet.getCell('B6').value = 'NO PO';
    worksheet.getCell('B6').alignment = { horizontal: 'center' };

    worksheet.getCell('C6').value = 'SN Machine';
    worksheet.getCell('C6').alignment = { horizontal: 'center' };

    worksheet.getCell('D6').value = 'Arrival Date';
    worksheet.getCell('D6').alignment = { horizontal: 'center' };

    worksheet.getCell('E6').value = 'Warehouse';
    worksheet.getCell('E6').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 40 },
      { key: 'data_d', width: 20 },
      { key: 'data_e', width: 40 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.no_po,
        data_c: (data?.mesin).join(', '),
        data_d: data?.tgl_tiba,
        data_e: data?.gudang,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Summary Warehouse Transfer ${moment().format('LL')}${fileExtension}`);
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
