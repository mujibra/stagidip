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
  const datas = props?.datas;
  const listPO = props?.listPO;
  const sumQuantity = props?.sumQuantity;
  const sumTotalDelivery = props?.sumTotalDelivery;
  const sumTotalActivation = props?.sumTotalActivation;
  const sumTotalBA = props?.sumTotalBA;
  const sumBANA = props?.sumBANA;
  const sumNotDelivery = props?.sumNotDelivery;
  const sumActivationNA = props?.sumActivationNA;
  const from_date = props?.from_date;
  const to_date = props?.to_date;

  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('SUMMARY IMPLEMENTATION');
    const worksheet = workbook.getWorksheet('SUMMARY IMPLEMENTATION');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'SUMMARY IMPLEMENTATION';
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

    worksheet.mergeCells('A5', 'B5');
    worksheet.getCell('A5').value = `${'Sum Quantity:' + ' '}${
      sumQuantity === null || sumQuantity === undefined || sumQuantity === NaN ? '-' : sumQuantity
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C3', 'D3');
    worksheet.getCell('C3').value = `${'Sum Total Delivery:' + ' '}${
      sumTotalDelivery === null || sumTotalDelivery === undefined || sumTotalDelivery === NaN
        ? '-'
        : sumTotalDelivery
    }`;
    worksheet.getCell('C3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C4', 'D4');
    worksheet.getCell('C4').value = `${'Sum Total Activation:' + ' '}${
      sumTotalActivation === null || sumTotalActivation === undefined || sumTotalActivation === NaN
        ? '-'
        : sumTotalActivation
    }`;
    worksheet.getCell('C4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('C5', 'D5');
    worksheet.getCell('C5').value = `${'Sum Total BA:' + ' '}${
      sumTotalBA === null || sumTotalBA === undefined || sumTotalBA === NaN ? '-' : sumTotalBA
    }`;
    worksheet.getCell('C5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('E3', 'F3');
    worksheet.getCell('E3').value = `${'Sum BA No Available:' + ' '}${
      sumBANA === null || sumBANA === undefined || sumBANA === NaN ? '-' : sumBANA
    }`;
    worksheet.getCell('E3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('E4', 'F4');
    worksheet.getCell('E4').value = `${'Sum No Delivery:' + ' '}${
      sumNotDelivery === null || sumNotDelivery === undefined || sumNotDelivery === NaN
        ? '-'
        : sumNotDelivery
    }`;
    worksheet.getCell('E4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('E5', 'F5');
    worksheet.getCell('E5').value = `${'Sum Activation No Available:' + ' '}${
      sumActivationNA === null || sumActivationNA === undefined || sumActivationNA === NaN
        ? '-'
        : sumNotDelivery
    }`;
    worksheet.getCell('E5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('G3', 'I3');
    worksheet.getCell('G3').value = `Data from  ${
      from_date === null || '' || undefined ? '-' : moment(from_date).format('LL')
    } to ${to_date === null || '' || undefined ? '-' : moment(to_date).format('LL')}`;
    worksheet.getCell('G3').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A7').value = 'No';
    worksheet.getCell('A7').alignment = { horizontal: 'center' };

    worksheet.getCell('B7').value = 'No PO/SPK';
    worksheet.getCell('B7').alignment = { horizontal: 'center' };

    worksheet.getCell('C7').value = 'Customer';
    worksheet.getCell('C7').alignment = { horizontal: 'center' };

    worksheet.getCell('D7').value = 'Quantity';
    worksheet.getCell('D7').alignment = { horizontal: 'center' };

    worksheet.getCell('E7').value = 'Type Machine';
    worksheet.getCell('E7').alignment = { horizontal: 'center' };

    worksheet.getCell('F7').value = 'Total Delivery';
    worksheet.getCell('F7').alignment = { horizontal: 'center' };

    worksheet.getCell('G7').value = '% Delivery';
    worksheet.getCell('G7').alignment = { horizontal: 'center' };

    worksheet.getCell('H7').value = 'Total Activation';
    worksheet.getCell('H7').alignment = { horizontal: 'center' };

    worksheet.getCell('I7').value = 'Total BA';
    worksheet.getCell('I7').alignment = { horizontal: 'center' };

    worksheet.getCell('J7').value = '% BA';
    worksheet.getCell('J7').alignment = { horizontal: 'center' };

    worksheet.getCell('K7').value = 'BA No Available';
    worksheet.getCell('K7').alignment = { horizontal: 'center' };

    worksheet.getCell('L7').value = 'No Delivery';
    worksheet.getCell('L7').alignment = { horizontal: 'center' };

    worksheet.getCell('M7').value = '% Activation';
    worksheet.getCell('M7').alignment = { horizontal: 'center' };

    worksheet.getCell('N7').value = 'Activation No Available';
    worksheet.getCell('N7').alignment = { horizontal: 'center' };

    /* Column headers */
    // worksheet.getRow().values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 20 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 20 },
      { key: 'data_h', width: 20 },
      { key: 'data_i', width: 20 },
      { key: 'data_j', width: 20 },
      { key: 'data_k', width: 20 },
      { key: 'data_l', width: 20 },
      { key: 'data_m', width: 20 },
      { key: 'data_n', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b:
          data?.no_po === null || data?.no_po === '' || data?.no_po === undefined
            ? '-'
            : data?.no_po,
        data_c:
          data?.customer_name === null ||
          data?.customer_name === '' ||
          data?.customer_name === undefined
            ? '-'
            : data?.customer_name,
        data_d:
          data?.quantity === null || data?.quantity === '' || data?.quantity === undefined || NaN
            ? 0
            : data?.quantity,
        data_e:
          data?.type_mesin === null || data?.type_mesin === '' || data?.type_mesin === undefined
            ? 0
            : data?.type_mesin,
        data_f:
          data?.total_kirim === null ||
          data?.total_kirim === '' ||
          data?.total_kirim === undefined ||
          NaN
            ? 0
            : data?.total_kirim,
        data_g:
          data?.persen_kirim === null ||
          data?.persen_kirim === '' ||
          data?.persen_kirim === undefined ||
          NaN
            ? 0
            : data?.persen_kirim,
        data_h:
          data?.total_activated === null ||
          data?.total_activated === '' ||
          data?.total_activated === undefined ||
          NaN
            ? 0
            : data?.total_activated,
        data_i:
          data?.total_ba === null || data?.total_ba === '' || data?.total_ba === undefined || NaN
            ? 0
            : data?.total_ba,
        data_j:
          data?.persen_ba === null || data?.persen_ba === '' || data?.persen_ba === undefined || NaN
            ? 0
            : data?.persen_ba,
        data_k:
          data?.ba_na === null || data?.ba_na === '' || data?.ba_na === undefined || NaN
            ? 0
            : data?.ba_na,
        data_l:
          data?.no_delivery === null ||
          data?.no_delivery === '' ||
          data?.no_delivery === undefined ||
          NaN
            ? 0
            : data?.no_delivery,
        data_m:
          data?.persen_activation === null ||
          data?.persen_activation === '' ||
          data?.persen_activation === undefined ||
          NaN
            ? 0
            : data?.persen_activation,
        data_n:
          data?.activation_na === null ||
          data?.activation_na === '' ||
          data?.activation_na === undefined ||
          NaN
            ? 0
            : data?.activation_na,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Summary Implementation ${moment().format('LL')}${fileExtension}`);
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
