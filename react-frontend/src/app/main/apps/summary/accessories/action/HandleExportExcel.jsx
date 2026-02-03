/* eslint-disable no-shadow */
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
  // console.log(props, 'popssssasdasdas');
  const datas = props?.datasLoop;
  const data = props?.data;
  // if (data) {
  // console.log(props?.data?.data_po[0]);
  // }
  // console.log(data, 'dataa');
  const dataHeader = props?.getDataPO;
  // console.log(dataHeader, 'header');
  const getPartNumber = props?.getPartNumber;
  // const listPO = props?.listPO;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Accessories Summary');
    const worksheet = workbook.getWorksheet('Accessories Summary');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Accessories Summary';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A3', 'B3');
    worksheet.getCell('A3').value = `${'NO PO:'}${
      dataHeader?.no_po === undefined ? '-' : dataHeader?.no_po
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A4', 'B4');
    worksheet.getCell('A4').value = `${'Customer :' + ' '}${
      dataHeader?.customer?.bank_desc === undefined ? '-' : dataHeader?.customer?.bank_desc
    }`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A5', 'B5');
    worksheet.getCell('A5').value = `${'Batch :' + ' '}${
      dataHeader?.batch?.name === undefined ? '-' : dataHeader?.batch?.name
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C3', 'C3');
    worksheet.getCell('C3').value = `${'PN System:' + ' '}${
      getPartNumber.length !== 0 ? getPartNumber?.join(', ') : '-'
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D3', 'D3');
    worksheet.getCell('D3').value = `${'Production Year:' + ' '}${
      dataHeader?.no_po === undefined
        ? '-'
        : moment(data?.data_po[0]?.tahun_produksi).format('MMMM YYYY')
    }`;
    worksheet.getCell('D3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D4', 'D4');
    worksheet.getCell('D4').value = `${'Production Year:' + ' '}${
      dataHeader?.no_po === undefined
        ? '-'
        : moment(data?.data_po[0]?.tgl_masuk).format('DD MMM YYYY')
    }`;
    worksheet.getCell('D4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C4', 'C4');
    worksheet.getCell('C4').value = `${'Type:' + ' '}${
      dataHeader?.type?.name === null ||
      dataHeader?.type?.name === undefined ||
      dataHeader?.type?.name === NaN
        ? '-'
        : 'ATM'
    }`;
    worksheet.getCell('C4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C5', 'C5');
    worksheet.getCell('C5').value = `${'Model:' + ' '}${
      dataHeader?.customer?.bank_desc === 'Bank Central Asia'
        ? dataHeader?.model_bca === null
          ? '-'
          : dataHeader?.model_bca
        : dataHeader?.model?.type === undefined
        ? '-'
        : dataHeader?.model?.type
    }`;
    worksheet.getCell('C5').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A7').value = 'NO';
    worksheet.getCell('A7').alignment = { horizontal: 'center' };

    worksheet.getCell('B7').value = 'Serial Number';
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

    worksheet.getCell('H7').value = 'WAREHOUSE';
    worksheet.getCell('H7').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(6).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 37 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 20 },
      { key: 'data_h', width: 47 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}`,
        data_b:
          data?.part_sn === null || data?.part_sn === '' || data?.part_sn === undefined
            ? '-'
            : data?.part_sn,
        data_c: data?.merk_aksesoris === null ? '-' : data?.merk_aksesoris,
        data_d:
          data?.concat_tipe_aksesoris === null ||
          data?.concat_tipe_aksesoris === '' ||
          data?.concat_tipe_aksesoris === undefined
            ? '-'
            : data?.concat_tipe_aksesoris,
        data_e: data?.concat_jenis_aksesoris === null ? '-' : data?.concat_jenis_aksesoris,
        data_f:
          data?.sn_paketmesin === null ||
          data?.sn_paketmesin === '' ||
          data?.sn_paketmesin === undefined
            ? '-'
            : data?.sn_paketmesin,
        data_g:
          data?.no_baris_mesin === null ||
          data?.no_baris_mesin === '' ||
          data?.no_baris_mesin === undefined
            ? '-'
            : data?.no_baris_mesin,
        data_h: data?.nama_gudang,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Accessories Summary ${moment().format('LL')}${fileExtension}`);
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
