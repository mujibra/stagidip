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
  const datas = props?.datas;
  // console.log(datas, 'datas');
  const listPO = props?.listPO;
  const sumTotal = props?.sumTotal;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Duration Staging Summary');
    const worksheet = workbook.getWorksheet('Duration Staging Summary');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Duration Staging Summary';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    // worksheet.mergeCells('A3', 'C3');
    // worksheet.getCell('A3').value = `${'NO PO:' + ' '}${
    //   listPO === null || listPO === undefined
    //     ? 'All PO'
    //     : listPO?.no_po_master
    //     ? listPO?.no_po_master
    //     : 'All PO'
    // }`;
    // worksheet.getCell('A3').alignment = { horizontal: 'left' };

    // worksheet.mergeCells('D3', 'G3');
    // worksheet.getCell('D3').value = `${'SUM TOTAL:' + ' '}${
    //   sumTotal === null || sumTotal === undefined || sumTotal === NaN
    //     ? '-'
    //     : sumTotal
    // }`;
    // worksheet.getCell('D3').alignment = { horizontal: 'left' };

    // worksheet.mergeCells('A4', 'G4');
    // worksheet.getCell('A4').value = `${'Tanggal:' + ' '}${moment().format(
    //   'LL'
    // )}`;
    // worksheet.getCell('A4').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A3').value = 'NO';
    worksheet.getCell('A3').alignment = { horizontal: 'center' };

    worksheet.getCell('B3').value = 'Customer';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };

    worksheet.getCell('C3').value = 'Type';
    worksheet.getCell('C3').alignment = { horizontal: 'center' };

    worksheet.getCell('D3').value = 'Model';
    worksheet.getCell('D3').alignment = { horizontal: 'center' };

    worksheet.getCell('E3').value = 'Spesification Average';
    worksheet.getCell('E3').alignment = { horizontal: 'center' };

    worksheet.getCell('F3').value = 'Staging Average';
    worksheet.getCell('F3').alignment = { horizontal: 'center' };

    worksheet.getCell('G3').value = 'Pre Staging Average';
    worksheet.getCell('G3').alignment = { horizontal: 'center' };
    worksheet.getCell('H3').value = 'Pre Loading Average';
    worksheet.getCell('H3').alignment = { horizontal: 'center' };
    worksheet.getCell('I3').value = 'Total Averange';

    /* Column headers */
    // worksheet.getRow(4).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 5 },
      { key: 'data_b', width: 30 },
      { key: 'data_c', width: 12 },
      { key: 'data_d', width: 15 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 20 },
      { key: 'data_h', width: 20 },
      { key: 'data_i', width: 20 },
      // { key: 'data_j', width: 10 },
      // { key: 'data_k', width: 10 },
      // { key: 'data_l', width: 10 },
      // { key: 'data_m', width: 10 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        // data_a: data?.no_mesin,
        data_b: data?.customer,
        data_c: data?.types,
        data_d: data?.models,
        data_e: data?.total_avg_specification,
        data_f: data?.total_avg_staging,
        data_g: data?.total_avg_checklist,
        data_h: data?.total_avg_preload,
        data_i: data?.total_avg,
        // data_i: data?.time_specification === null ? '-' : data?.time_specification,
        // data_j: data?.time_staging === null ? '-' : data?.time_staging,
        // data_k: data?.time_prestaging === null ? '-' : data?.time_prestaging,
        // data_l: data?.time_preloading === null ? '-' : data?.time_preloading,
        // data_m: data?.total_duration === null ? '-' : data?.total_duration,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Duration Staging Summary ${moment().format('LL')}${fileExtension}`);
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
