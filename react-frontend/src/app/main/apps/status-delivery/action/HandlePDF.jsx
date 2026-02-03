/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';

export const HandlePDF = props => {
  const DataPDF = [];

  [props?.dataById].map(item =>
    DataPDF.push(
      item?.no_po === null ? '-' : item?.no_po,
      item?.customer === null ? '-' : item?.customer?.bank_desc,
      item?.gudang === null ? '-' : item?.gudang?.gudang_desc,
      item?.sn_mesin,
      moment(item?.tgl_keluar).format('YYYY-DD-MM'),
      moment(item?.tgl_received).format('YYYY-DD-MM')
    )
  );

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`List PO Tanggal ${moment().format('LL')}`, 20, 20);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        [
          'No PO',
          'Customer',
          'Warehouse',
          'SN Mesin',
          'Model',
          'Departure Date',
          'Arrival Date',
        ],
      ],
      headStyles: { fontSize: 7, halign: 'center' },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
        6: { fontSize: 7, halign: 'center' },
        7: { fontSize: 7, halign: 'center' },
      },

      body: [DataPDF],
    });
    doc.save(`Status of Delivery ${moment().format('LL')}.pdf`);
  };

  return (
    <div>
      <Button color="success" onClick={downloadPDF} variant="contained">
        <PrintIcon className="mr-2" />
        Export PDF
      </Button>
    </div>
  );
};
