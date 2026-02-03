/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { makeStyles } from '@mui/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 5,
  },
}));
const useStyles = makeStyles({
  tableCell: {
    minWidth: '100px',
    cursor: 'pointer',
  },
  cursorTable: {
    cursor: 'pointer',
  },
  root: {
    fontSize: '200pt',
  },
  table: {
    fontSize: '100pt',
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const headCells = [
  {
    id: 'noPO',
    numeric: true,
    disablePadding: false,
    label: 'No PO',
  },
  {
    id: 'tanggalPo',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order Date',
  },
  {
    id: 'statusPO',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order Status',
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'Customer',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'jumlah',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'jml_mesin_staging',
    numeric: true,
    disablePadding: false,
    label: 'Quantity Staging',
  },
  {
    id: 'model',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'brand',
    numeric: true,
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'bacth',
    numeric: true,
    disablePadding: false,
    label: 'Batch',
  },
  {
    id: 'partNumber',
    numeric: true,
    disablePadding: false,
    label: 'Part Number System',
  },
  {
    id: 'snBatch',
    numeric: true,
    disablePadding: false,
    label: 'SN Batch',
  },
  {
    id: 'style',
    numeric: true,
    disablePadding: false,
    label: 'Style',
  },
  {
    id: 'thnProduksi',
    numeric: true,
    disablePadding: false,
    label: 'Production Year',
  },
  {
    id: 'whereHouse',
    numeric: true,
    disablePadding: false,
    label: 'Warehouse',
  },
  {
    id: 'tglMasuk',
    numeric: true,
    disablePadding: false,
    label: 'Entry Date',
  },
  {
    id: 'tglStagging',
    numeric: true,
    disablePadding: false,
    label: 'Planned Staging Date',
  },
  {
    id: 'picMitra',
    numeric: true,
    disablePadding: false,
    label: 'PIC Staging',
  },
  {
    id: 'status_mesin',
    numeric: true,
    disablePadding: false,
    label: 'Status Machine',
  },
];

function createData(
  id,
  no_po,
  tgl_po,
  status_po,
  part_number,
  sn_batch,
  styles,
  model,
  status_mesin,
  tahun_produksi,
  customer,
  pic_staging,
  tgl_staging,
  jumlah,
  jml_mesin_staging,
  tgl_masuk,
  batch,
  brand,
  mesin,
  gudang,
  stok,
  total_transfer,
  po_master,
  status_po_details,
  total_keluar
) {
  return {
    id,
    no_po,
    tgl_po,
    status_po,
    part_number,
    sn_batch,
    styles,
    model,
    status_mesin,
    tahun_produksi,
    customer,
    pic_staging,
    tgl_staging,
    jumlah,
    jml_mesin_staging,
    tgl_masuk,
    batch,
    brand,
    // tgl_produksi,
    mesin,
    gudang,
    stok,
    total_transfer,
    po_master,
    status_po_details,
    total_keluar,
  };
}

export default function HandleTabelShowDetail(props) {
  const classes = useStyles();
  // console.log(props);
  const datas = props?.dataById;
  // console.log(datas, 'ini datas');
  const rows = [datas]?.map((item, index) =>
    createData(
      item?.id,
      item?.no_po,
      item?.tgl_po,
      item?.status_po,
      item?.part_number,
      item?.sn_batch,
      item?.styles,
      item?.model,
      item?.status_mesin,
      item?.tahun_produksi,
      item?.customer,
      item?.pic_staging,
      item?.tgl_staging,
      item?.jumlah,
      item?.jml_mesin_staging,
      // item?.stok,
      item?.tgl_masuk,
      item?.batch,
      item?.brand,
      item?.mesin,
      item?.gudang,
      item?.stok,
      item?.total_transfer,
      item?.po_master,
      item?.status_po_details,
      item?.total_keluar
    )
  );
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead className="bg-blue-800">
          <TableRow>
            {headCells.map((headCell) => (
              <StyledTableCell key={headCell.id} align="center">
                {headCell.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell align="center" className={classes?.tableCell}>
                {/* {row?.no_po === null ? '-' : row?.no_po} */}
                {row?.po_master?.no_po_master === null ? '-' : row?.po_master?.no_po_master}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.tgl_po === null ? '-' : moment(row?.tgl_po).format('DD MMM YYYY')}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.status_po_details?.status_desc === ''
                  ? '-'
                  : row?.status_po_details?.status_desc}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.customer === null ? '-' : row?.customer?.bank_desc}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {/* {row?.stok} */}
                {row?.jumlah}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {/* {row?.stok} */}
                {row?.jumlah - row?.total_transfer - row?.total_keluar}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {/* {row?.stok} */}
                {row?.jml_mesin_staging}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.model?.name === '' ? '-' : row?.model?.name}
              </TableCell>
              <TableCell
                align="center"
                // style={{ minWidth: 100 }}
                className={classes?.tableCell}
              >
                {row?.mesin?.type === '' ? '-' : row?.mesin?.type}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.brand === '' ? '-' : row?.brand}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.batch?.name === null ? '-' : row?.batch?.name}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.part_number === '' ? '-' : row?.part_number}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.sn_batch === '' ? '-' : row?.sn_batch}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.styles === null ? '-' : row?.styles.name}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.tahun_produksi === null
                  ? '-'
                  : moment(row?.tahun_produksi).format('MMMM YYYY')}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell} style={{ minWidth: 200 }}>
                {row?.gudang?.gudang_desc === '' ? '-' : row?.gudang?.gudang_desc}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.tgl_masuk === null ? '-' : moment(row?.tgl_masuk).format('DD MMM YYYY')}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.tgl_staging === null ? '-' : moment(row?.tgl_staging).format('DD MMM YYYY')}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.pic_staging.name === '' ? '-' : row?.pic_staging.name}
              </TableCell>
              <TableCell align="center" className={classes?.tableCell}>
                {row?.status_mesin === '' ? '-' : row?.status_mesin}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
