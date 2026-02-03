/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';

export const HandlePDF = props => {
  console.log(props, 'poropsd asdaskfa');
  const DataPDF = [];

  [props?.dataById].map(item =>
    DataPDF.push(
      item?.no_po === null ? '-' : item?.no_po,
      item?.tgl_po,
      item?.customer === null ? '-' : item?.customer?.bank_desc,
      item?.jumlah,
      item?.jumlah - item?.total_transfer,
      item?.jml_mesin_staging,
      item?.model?.name,
      item?.mesin?.type,
      item?.brand,
      item?.batch?.name,
      item?.part_number,
      item?.sn_batch,
      item?.styles === null ? '-' : item?.styles.name,
      moment(item?.tahun_produksi).format('MMMM-YYYY'),
      item?.gudang?.gudang_desc,
      item?.tgl_masuk,
      item?.tgl_staging,
      item?.pic_staging?.name,
      item?.status_mesin
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
          'Purchase Order Date',
          'Customer',
          'Total',
          'Quantity',
          'Quantity Staging',
          'Type',
          'Model',
          'Brand',
          'Batch',
          'PartNumber System',
          'SN Batch',
          'Style',
          'Production Year',
          'Warehouse',
          'Entry Date',
          'Staging Date',
          'PIC Staging',
          'Purchase Order Status',
        ],
      ],
      headStyles: { fontSize: 5, halign: 'center' },
      columnStyles: {
        0: { fontSize: 5, halign: 'center' },
        1: { fontSize: 5, halign: 'center' },
        2: { fontSize: 5, halign: 'center' },
        3: { fontSize: 5, halign: 'center' },
        4: { fontSize: 5, halign: 'center' },
        5: { fontSize: 5, halign: 'center' },
        6: { fontSize: 5, halign: 'center' },
        5: { fontSize: 5, halign: 'center' },
        8: { fontSize: 5, halign: 'center' },
        9: { fontSize: 5, halign: 'center' },
        10: { fontSize: 5, halign: 'center' },
        11: { fontSize: 5, halign: 'center' },
        12: { fontSize: 5, halign: 'center' },
        13: { fontSize: 5, halign: 'center' },
        14: { fontSize: 5, halign: 'center' },
        15: { fontSize: 5, halign: 'center' },
        16: { fontSize: 5, halign: 'center' },
        17: { fontSize: 5, halign: 'center' },
        18: { fontSize: 5, halign: 'center' },
        19: { fontSize: 5, halign: 'center' },
      },

      body: [DataPDF],
    });
    doc.save(`Download PO ${moment().format('LL')}.pdf`);
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
