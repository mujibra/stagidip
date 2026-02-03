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
  const datas = props?.data;
  const listPO = props?.listPO;
  const sumTotal = props?.sumTotal;
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('SUMMARY DELIVERY REQUEST');
    const worksheet = workbook.getWorksheet('SUMMARY DELIVERY REQUEST');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Delivery Request';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A3').value = 'NO';
    worksheet.getCell('A3').alignment = { horizontal: 'center' };

    worksheet.getCell('B3').value = 'Customer';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };

    worksheet.getCell('C3').value = 'Date';
    worksheet.getCell('C3').alignment = { horizontal: 'center' };

    worksheet.getCell('D3').value = 'Purpose';
    worksheet.getCell('D3').alignment = { horizontal: 'center' };

    worksheet.getCell('E3').value = 'Contact Person';
    worksheet.getCell('E3').alignment = { horizontal: 'center' };

    worksheet.getCell('F3').value = 'No Contact';
    worksheet.getCell('F3').alignment = { horizontal: 'center' };

    worksheet.getCell('G3').value = 'Address';
    worksheet.getCell('G3').alignment = { horizontal: 'center' };
    worksheet.getCell('H3').value = 'Request By';
    worksheet.getCell('H3').alignment = { horizontal: 'center' };
    worksheet.getCell('I3').value = 'Warehouse';
    worksheet.getCell('I3').alignment = { horizontal: 'center' };
    worksheet.getCell('J3').value = 'Approve';
    worksheet.getCell('J3').alignment = { horizontal: 'center' };

    /* Column headers */
    // worksheet.getRow(4).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 4 },
      { key: 'data_b', width: 23 },
      { key: 'data_c', width: 16 },
      { key: 'data_d', width: 24 },
      { key: 'data_e', width: 24 },
      { key: 'data_f', width: 24 },
      { key: 'data_g', width: 24 },
      { key: 'data_h', width: 24 },
      { key: 'data_i', width: 24 },
      { key: 'data_j', width: 24 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    datas.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}.`,
        data_b: data?.detail_po?.customer?.bank_desc,
        data_c: moment(data?.tanggal_request).format('LL'),
        data_d: data?.purpose === null ? '-' : data?.purpose,
        data_e: data?.contact_person === null ? '-' : data?.contact_person,
        data_f: data?.contact_no === null ? '-' : data?.contact_no,
        data_g: data?.address === null ? '-' : data?.address,
        data_h: data?.request_by?.name,
        data_i: data?.detail_po?.gudang?.gudang_desc,
        data_j:
          data?.status_approval === null
            ? 'Approval'
            : data?.status_approval === '0'
            ? 'Reject'
            : 'Approved',
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `DELIVERY REQUEST ${moment().format('LL')}${fileExtension}`);
    })();
  }

  return (
    <div>
      <FuseAnimate animation="transition.slideLeftIn" delay={100}>
        <Button variant="contained" color="success" onClick={exportExcel}>
          <PrintIcon className="mr-2" />
          <div className="hidden md:contents">Export Excel</div>
        </Button>
      </FuseAnimate>
    </div>
  );
};

export default HandleExportExcel;
