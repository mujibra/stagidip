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
    const sheet = workbook.addWorksheet('DATA SPECIFICATION');
    const worksheet = workbook.getWorksheet('DATA SPECIFICATION');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'DATA SPECIFICATION';
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

    worksheet.getCell('C6').value = 'Type';
    worksheet.getCell('C6').alignment = { horizontal: 'center' };

    worksheet.getCell('D6').value = 'Model';
    worksheet.getCell('D6').alignment = { horizontal: 'center' };

    worksheet.getCell('E6').value = 'Part Number System';
    worksheet.getCell('E6').alignment = { horizontal: 'center' };

    worksheet.getCell('F6').value = 'Customer';
    worksheet.getCell('F6').alignment = { horizontal: 'center' };

    worksheet.getCell('G6').value = 'Time';
    worksheet.getCell('G6').alignment = { horizontal: 'center' };

    worksheet.getCell('H6').value = 'Approval PIC Staging';
    worksheet.getCell('H6').alignment = { horizontal: 'center' };
    worksheet.getCell('I6').value = 'Approval PIC TSS';
    worksheet.getCell('I6').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(0).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 30 },
      { key: 'data_d', width: 30 },
      { key: 'data_e', width: 30 },
      { key: 'data_f', width: 30 },
      { key: 'data_f1', width: 30 },
      { key: 'data_g', width: 30 },
      { key: 'data_h', width: 30 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      // console.log(data, 'data for excel');
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.detail_po ? data?.detail_po : '-',
        data_c: data?.model ? data?.model : '-',
        data_d: data?.mesin ? data?.mesin : '-',
        data_e: data?.pn_system ? data?.pn_system : '-',
        data_f: data?.customer ? data?.customer : '-',
        data_f1: data?.time_todo ? data?.time_todo : '-',
        data_g: data?.approval_staging ? data?.approval_staging : '-',
        data_h: data?.approval_tss ? data?.approval_tss : '-',
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Specification ${moment().format('LL')}${fileExtension}`);
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
