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

const HandleExportExcel = props => {
  const datas = props?.datas;
  const listPO = props?.listPO;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('DATA Pre Loading');
    const worksheet = workbook.getWorksheet('DATA Pre Loading');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'DATA Pre Loading';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A3', 'G3');
    // worksheet.getCell('A3').value = `${'NO PO:' + ' '}${
    //   listPO === null ? 'All PO' : listPO?.no_po_master
    // }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };
    worksheet.mergeCells('A4', 'G4');
    worksheet.getCell('A4').value = `${'Tanggal:' + ' '}${moment().format(
      'LL'
    )}`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A6').value = 'NO';
    worksheet.getCell('A6').alignment = { horizontal: 'center' };

    worksheet.getCell('B6').value = 'NO PO';
    worksheet.getCell('B6').alignment = { horizontal: 'center' };

    worksheet.getCell('C6').value = 'Tanggal PO';
    worksheet.getCell('C6').alignment = { horizontal: 'center' };

    worksheet.getCell('D6').value = 'Status PO';
    worksheet.getCell('D6').alignment = { horizontal: 'center' };

    worksheet.getCell('E6').value = 'Customer';
    worksheet.getCell('E6').alignment = { horizontal: 'center' };

    worksheet.getCell('F6').value = 'Total';
    worksheet.getCell('F6').alignment = { horizontal: 'center' };

    worksheet.getCell('G6').value = 'Type';
    worksheet.getCell('G6').alignment = { horizontal: 'center' };

    worksheet.getCell('H6').value = 'Model';
    worksheet.getCell('H6').alignment = { horizontal: 'center' };

    worksheet.getCell('I6').value = 'Brand';
    worksheet.getCell('I6').alignment = { horizontal: 'center' };

    worksheet.getCell('J6').value = 'Batch';
    worksheet.getCell('J6').alignment = { horizontal: 'center' };

    worksheet.getCell('K6').value = 'Part Number System';
    worksheet.getCell('K6').alignment = { horizontal: 'center' };

    worksheet.getCell('L6').value = 'Tahun Produksi';
    worksheet.getCell('L6').alignment = { horizontal: 'center' };

    worksheet.getCell('M6').value = 'Warehouse';
    worksheet.getCell('M6').alignment = { horizontal: 'center' };

    worksheet.getCell('N6').value = 'Tanggal Masuk';
    worksheet.getCell('N6').alignment = { horizontal: 'center' };

    worksheet.getCell('O6').value = 'Tanggal Rencana Staging';
    worksheet.getCell('O6').alignment = { horizontal: 'center' };

    worksheet.getCell('P6').value = 'PIC Staging';
    worksheet.getCell('P6').alignment = { horizontal: 'center' };

    worksheet.getCell('Q6').value = 'Status Machine';
    worksheet.getCell('Q6').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(0).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 15 },
      { key: 'data_d', width: 15 },
      { key: 'data_e', width: 40 },
      { key: 'data_f', width: 10 },
      { key: 'data_g', width: 15 },
      { key: 'data_h', width: 15 },
      { key: 'data_i', width: 15 },
      { key: 'data_j', width: 15 },
      { key: 'data_k', width: 30 },
      { key: 'data_l', width: 20 },
      { key: 'data_m', width: 45 },
      { key: 'data_n', width: 15 },
      { key: 'data_o', width: 30 },
      { key: 'data_p', width: 30 },
      { key: 'data_q', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      // console.log(data, 'data');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.no_po,
        data_c: data?.tgl_po,
        data_d: data?.status_po,
        data_e: data?.customer,
        data_f: data?.jumlah,
        data_g: data?.model,
        data_h: data?.mesin,
        data_i: data?.brand,
        data_j: data?.batch,
        data_k: data?.part_number,
        data_l: data?.tahun_produksi,
        data_m: data?.gudang,
        data_n: data?.tgl_masuk,
        data_o: data?.tgl_staging,
        data_p: data?.pic_staging,
        data_q: data?.status_mesin,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Data Pre Loading ${moment().format('LL')}${fileExtension}`);
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
