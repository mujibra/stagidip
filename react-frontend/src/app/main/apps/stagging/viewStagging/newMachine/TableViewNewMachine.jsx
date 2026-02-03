/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

// import { getMachie } from '../store/machineSlice';

const useStyles = makeStyles({
  tableCell: {
    minWidth: "150px",
    cursor: "pointer",
  },
  cursorTable: {
    cursor: "pointer",
  },
});

// function createData(
//   id,
//   no_po,
//   tgl_po,
//   status_po,
//   part_number,
//   sn_batch,
//   model,
//   status_mesin,
//   tahun_produksi,
//   customer,
//   pic_staging,
//   tgl_staging,
//   jumlah,
//   tgl_masuk,
//   batch,
//   brand,
//   mesin,
//   gudang,
//   stok
// ) {
//   return {
//     id,
//     no_po,
//     tgl_po,
//     status_po,
//     part_number,
//     model,
//     status_mesin,
//     tahun_produksi,
//     customer,
//     pic_staging,
//     tgl_staging,
//     jumlah,
//     tgl_masuk,
//     batch,
//     brand,
//     mesin,
//     gudang,
//     stok,
//   };
// }

function createData(
  id,
  no_po,
  tgl_po,
  status_po,
  part_number,
  sn_batch,
  style,
  model,
  status_mesin,
  tahun_produksi,
  customer,
  pic_staging,
  tgl_staging,
  jumlah,
  tgl_masuk,
  batch,
  brand,
  mesin,
  gudang,
  stok
) {
  return {
    id,
    no_po,
    tgl_po,
    status_po,
    part_number,
    sn_batch,
    style,
    model,
    status_mesin,
    tahun_produksi,
    customer,
    pic_staging,
    tgl_staging,
    jumlah,
    tgl_masuk,
    batch,
    brand,
    mesin,
    gudang,
    stok,
  };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "NO",
  },
  {
    id: "noPO",
    numeric: true,
    disablePadding: false,
    label: "No PO",
  },
  // {
  //   id: 'noPO Dummy',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'No Po Dummy',
  // },
  {
    id: "tanggalPo",
    numeric: true,
    disablePadding: false,
    label: "Purchase Order Date",
  },
  {
    id: "statusPO",
    numeric: true,
    disablePadding: false,
    label: "Status PO",
  },
  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "jumlah",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  // {
  //   id: 'Quantity',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Quantity',
  // },
  {
    id: "model",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Model",
  },
  {
    id: "brand",
    numeric: true,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "bacth",
    numeric: true,
    disablePadding: false,
    label: "Batch",
  },
  {
    id: "partNumber",
    numeric: true,
    disablePadding: false,
    label: "Part Number System",
  },
  {
    id: "sn_batch",
    numeric: true,
    disablePadding: false,
    label: "SN batch",
  },
  {
    id: "style",
    numeric: true,
    disablePadding: false,
    label: "Style",
  },
  {
    id: "thnProduksi",
    numeric: true,
    disablePadding: false,
    label: "Production Year",
  },
  // {
  //   id: 'tglProduksi',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Tanggal Produksi',
  // },
  {
    id: "whereHouse",
    numeric: true,
    disablePadding: false,
    label: "Warehouse",
  },
  {
    id: "tglMasuk",
    numeric: true,
    disablePadding: false,
    label: "Arrival Date",
  },
  {
    id: "tglStagging",
    numeric: true,
    disablePadding: false,
    label: "Planned Staging Date",
  },
  {
    id: "picMitra",
    numeric: true,
    disablePadding: false,
    label: "PIC Staging",
  },
  // {
  //   id: 'status_po',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status PO',
  // },
  {
    id: "status_mesin",
    numeric: true,
    disablePadding: false,
    label: "Status Machine",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-blue-50">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  // console.log(props)
  const { numSelected } = props;

  const handleDeleteAll = () => {
    // console.log(props.arrDel.id);
    // console.log(numSelected);
  };

  return (
    <Toolbar
      className="rounded-t-lg bg-blue-750"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          className="text-white"
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className="text-white"
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of Purchase Order
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton color="error" className="z-10">
            <DeleteIcon onClick={handleDeleteAll} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon color="info" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TableViewNewMachine(props) {
  const [open, setOpen] = useState(false);
  const [openShowData, setOpenShowData] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState("");

  const [dataById, setDataById] = useState([]);
  const [arrDel, setArrDel] = useState([]);

  const filteredData = props?.data?.filter(
    (row) =>
      row?.no_po?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      (row?.tgl_po &&
        moment(row?.tgl_po)
          .format("DD MMM YYYY")
          .toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      row?.status_po?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.customer?.bank_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.jumlah
        ?.toString()
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.model?.name?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.mesin?.type?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.brand?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.batch?.name?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.part_number?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.sn_batch?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.style?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      (row?.tahun_produksi &&
        moment(row?.tahun_produksi)
          .format("MMMM YYYY")
          .toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      (row?.tgl_masuk &&
        moment(row?.tgl_masuk)
          .format("DD MMM YYYY")
          .toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      (row?.tgl_staging &&
        moment(row?.tgl_staging)
          .format("DD MMM YYYY")
          .toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      row?.gudang?.gudang_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.pic_staging?.name?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.status_mesin?.toLowerCase()?.includes(searched?.toLowerCase())
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const datas = filteredData?.map((item, index) =>
    createData(
      item?.id,
      item?.no_po,
      item?.tgl_po,
      item?.status_po === null ? "-" : item?.status_po,
      item?.part_number,
      item?.sn_batch,
      item?.style,

      item?.model,
      item?.status_mesin,
      item?.tahun_produksi,
      item?.customer,
      item?.pic_staging,
      item?.tgl_staging,
      item?.jumlah,
      item?.tgl_masuk,
      item?.batch,
      item?.brand,
      item?.mesin,
      item?.gudang,
      item?.stok
    )
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
        {/* Search field new machine */}
        <div className="p-10 w-1/3">
          <TextField
            fullWidth
            label="Search"
            value={searched}
            onChange={handleSearch}
            variant="outlined"
            // size="small"
            style={{ marginBottom: "10px", marginLeft: "10px" }}
          />
        </div>

        <EnhancedTableToolbar arrDel={arrDel} numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 440 }}>
          {props.loading === true ? (
            <FuseLoading />
          ) : datas.length !== 0 ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              stickyHeader
              aria-label="sticky table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={datas.length}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // console.log(row, 'row')
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        //
                        // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {`${row?.no_po === null ? "-" : row?.no_po}`}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_po === null
                            ? "-"
                            : moment(row?.tgl_po).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.status_po === "" ? "-" : row?.status_po}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.customer === null
                            ? "-"
                            : row?.customer?.bank_desc}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.jumlah === "" ? "-" : row?.jumlah}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.model?.name === "" ? "-" : row?.model?.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          // style={{ minWidth: 100 }}
                          className={classes?.tableCell}
                        >
                          {row?.mesin?.type === "" ? "-" : row?.mesin?.type}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.brand === "" ? "-" : row?.brand}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.batch?.name === null ? "-" : row?.batch?.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.part_number === "" ? "-" : row?.part_number}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.sn_batch === "" ? "-" : row?.sn_batch}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.style === null ? "-" : row?.style}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tahun_produksi === null
                            ? "-"
                            : moment(row?.tahun_produksi).format("MMMM YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                          style={{ minWidth: 200 }}
                        >
                          {row?.gudang?.gudang_desc === ""
                            ? "-"
                            : row?.gudang?.gudang_desc}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_masuk === null
                            ? "-"
                            : moment(row?.tgl_masuk).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_staging === null
                            ? "-"
                            : moment(row?.tgl_staging).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.pic_staging.name === ""
                            ? "-"
                            : row?.pic_staging.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.status_mesin === "" ? "-" : row?.status_mesin}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center m-20">
              <div>No Data Available</div>
            </div>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={datas?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
