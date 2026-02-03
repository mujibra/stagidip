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

const HandleExportExcel = props => {
  // console.log(props, ' porps excel');
  const detail = props.detail;
  const datas = props?.datas;
  const body = props.body;
  const listPO = props?.listPO;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Summary UPS');
    const worksheet = workbook.getWorksheet('Summary UPS');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Summary UPS';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A3', 'B3');
    worksheet.getCell('A3').value = `${'NO PO:'}${
      body?.id_po?.no_po_master === undefined ? '-' : body?.id_po?.no_po_master
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A4', 'B4');
    worksheet.getCell('A4').value = `${'Customer :' + ' '}${
      detail?.customer?.bank_desc === undefined
        ? '-'
        : detail?.customer?.bank_desc
    }`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A5', 'B5');
    worksheet.getCell('A5').value = `${'Batch :' + ' '}${
      detail?.batch?.name === undefined ? '-' : detail?.batch?.name
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C3', 'D3');
    worksheet.getCell('C3').value = `${'Tanggal Masuk :' + ' '}${
      detail?.tgl_masuk === undefined
        ? '-'
        : moment(detail?.tgl_masuk).format('LL')
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C4', 'D4');
    worksheet.getCell('C4').value = `${'Type:' + ' '}${
      detail?.type?.name === null ||
      detail?.type?.name === undefined ||
      detail?.type?.name === NaN
        ? '-'
        : detail?.type?.name
    }`;
    worksheet.getCell('C4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C5', 'D5');
    worksheet.getCell('C5').value = `${'Model:' + ' '}${
      detail?.customer?.bank_desc === 'Bank Central Asia'
        ? detail?.model_bca === null
          ? '-'
          : detail?.model_bca
        : detail?.model?.type === undefined
        ? '-'
        : detail?.model?.type
    }`;
    worksheet.getCell('C5').alignment = { horizontal: 'left' };
    // worksheet.getCell('A3').alignment = { horizontal: 'left' };
    // worksheet.mergeCells('A4', 'G4');
    // worksheet.getCell('A4').value = `${'Date:' + ' '}${moment().format('LL')}`;
    // worksheet.getCell('A4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A7').value = 'NO';
    worksheet.getCell('A7').alignment = { horizontal: 'center' };

    worksheet.getCell('B7').value = 'SERIAL NUMBER';
    worksheet.getCell('B7').alignment = { horizontal: 'center' };

    worksheet.getCell('C7').value = 'Merk Accesories';
    worksheet.getCell('C7').alignment = { horizontal: 'center' };

    worksheet.getCell('D7').value = 'Tipe Accesories';
    worksheet.getCell('D7').alignment = { horizontal: 'center' };

    worksheet.getCell('E7').value = 'Jenis Accesories';
    worksheet.getCell('E7').alignment = { horizontal: 'center' };

    worksheet.getCell('F7').value = 'SN Paket Mesin';
    worksheet.getCell('F7').alignment = { horizontal: 'center' };

    worksheet.getCell('G7').value = 'No Baris Mesin';
    worksheet.getCell('G7').alignment = { horizontal: 'center' };

    worksheet.getCell('H7').value = 'Warehouse';
    worksheet.getCell('H7').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(6).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 23 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 20 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 23 },
      { key: 'data_h', width: 45 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b:
          data?.serial_number_ups === null ||
          data?.serial_number_ups === '' ||
          data?.serial_number_ups === undefined
            ? '-'
            : data?.serial_number_ups,
        data_c: data?.merk_aksesoris === null ? '-' : data?.merk_aksesoris,
        data_d:
          data?.tipe_aksesoris === null ||
          data?.tipe_aksesoris === '' ||
          data?.tipe_aksesoris === undefined
            ? '-'
            : data?.tipe_aksesoris,
        data_e: data?.jenis_aksesoris === null ? '-' : data?.jenis_aksesoris,
        data_f:
          data?.sn_mesin === null ||
          data?.sn_mesin === '' ||
          data?.sn_mesin === undefined
            ? '-'
            : data?.sn_mesin,
        data_g:
          data?.no_baris_mesin === null ||
          data?.no_baris_mesin === '' ||
          data?.no_baris_mesin === undefined
            ? '-'
            : data?.no_baris_mesin,
        data_h: data?.warehouse,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Summary UPS ${moment().format('LL')}${fileExtension}`);
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
