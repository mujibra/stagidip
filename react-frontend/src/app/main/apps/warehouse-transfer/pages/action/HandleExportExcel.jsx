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
    const sheet = workbook.addWorksheet('DATA WAREHOUSE TRANSFER');
    const worksheet = workbook.getWorksheet('DATA WAREHOUSE TRANSFER');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'DATA WAREHOUSE TRANSFER';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A3', 'G3');
    // worksheet.getCell('A3').value = `${'NO PO:' + ' '}${
    //   listPO === null ? 'All PO' : listPO?.no_po_master
    // }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A4', 'G4');
    worksheet.getCell('A4').value = `${'Tanggal:' + ' '}${moment().format('LL')}`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A6').value = 'NO';
    worksheet.getCell('A6').alignment = { horizontal: 'center' };

    worksheet.getCell('B6').value = 'NO PO';
    worksheet.getCell('B6').alignment = { horizontal: 'center' };

    worksheet.getCell('C6').value = 'Jumlah';
    worksheet.getCell('C6').alignment = { horizontal: 'center' };

    worksheet.getCell('D6').value = 'SN Mesin';
    worksheet.getCell('D6').alignment = { horizontal: 'center' };

    worksheet.getCell('E6').value = 'Gudang Asal';
    worksheet.getCell('E6').alignment = { horizontal: 'center' };

    worksheet.getCell('F6').value = 'Gudang Tujuan';
    worksheet.getCell('F6').alignment = { horizontal: 'center' };

    worksheet.getCell('G6').value = 'Tanggal Masuk';
    worksheet.getCell('G6').alignment = { horizontal: 'center' };

    worksheet.getCell('H6').value = 'Tanggal Keluar';
    worksheet.getCell('H6').alignment = { horizontal: 'center' };

    worksheet.getCell('I6').value = 'Tanggal Staging';
    worksheet.getCell('I6').alignment = { horizontal: 'center' };

    worksheet.getCell('J6').value = 'PIC';
    worksheet.getCell('J6').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(7).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 30 },
      { key: 'data_d', width: 30 },
      { key: 'data_e', width: 40 },
      { key: 'data_f', width: 40 },
      { key: 'data_g', width: 30 },
      { key: 'data_h', width: 30 },
      { key: 'data_i', width: 30 },
      { key: 'data_j', width: 30 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      // console.log(data, 'data for excel');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.purchaseOrder,
        data_c: data?.jumlah,
        data_d: (data?.sn_mesins).join(', '),
        data_e: data?.from_warehouse,
        data_f: data?.to_warehouse,
        data_g: data?.tgl_masuk,
        data_h: data?.tgl_keluar,
        data_i: data?.tgl_staging,
        data_j: data?.pic,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Warehouse Transfer ${moment().format('LL')}${fileExtension}`);
    })();
  }

  return (
    <div>
      <FuseAnimate animation="transition.slideLeftIn" delay={100}>
        <Button variant="contained" onClick={exportExcel}>
          <PrintIcon className="mr-2" />
          <div className="hidden md:contents">Export Excel</div>
        </Button>
      </FuseAnimate>
    </div>
  );
};

export default HandleExportExcel;
