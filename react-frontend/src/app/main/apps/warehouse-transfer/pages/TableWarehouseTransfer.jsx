/* eslint-disable array-callback-return */
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
// import Checkbox from '@mui/material/Checkbox';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  useState,
  useEffect,
  // useCallback
} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import FuseLoading from "@fuse/core/FuseLoading";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { closeDialog, openDialog } from "app/store/fuse/dialogSlice";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import HandleEditDetail from "./action/HandleEditDetail";

const getUser = JSON.parse(localStorage.getItem("user_profile"));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}

const useStyles = makeStyles({
  tableCell: {
    minWidth: "150px",
  },
});

function createData(
  id,
  purchaseOrder,
  id_customer,
  jumlah,
  from_warehouse,
  to_warehouse,
  tgl_keluar,
  tgl_masuk,
  tgl_staging,
  pic,
  sn_mesins
) {
  return {
    id,
    purchaseOrder,
    id_customer,
    jumlah,
    from_warehouse,
    to_warehouse,
    tgl_keluar,
    tgl_masuk,
    tgl_staging,
    pic,
    sn_mesins,
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
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
    numeric: true,
    disablePadding: false,
    label: "NO",
  },
  {
    id: "no_po",
    numeric: true,
    disablePadding: false,
    label: "No PO",
  },
  {
    id: "jumlah",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "sn_mesins",
    numeric: true,
    disablePadding: false,
    label: "SN Machine",
  },
  {
    id: "from_warehouse",
    numeric: true,
    disablePadding: false,
    label: "Origin Warehouse",
  },
  {
    id: "to_warehouse",
    numeric: true,
    disablePadding: false,
    label: "Destination Warehouse",
  },
  {
    id: "tgl_masuk",
    numeric: true,
    disablePadding: false,
    label: "Arrival Date",
  },
  {
    id: "tgl_keluar",
    numeric: true,
    disablePadding: false,
    label: "Departure Date",
  },
  {
    id: "tgl_staging",
    numeric: true,
    disablePadding: false,
    label: "Staging Date",
  },
  {
    id: "pic",
    numeric: true,
    disablePadding: false,
    label: "PIC",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "no_po" ? "left" : "center"}
            // align="center"
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
          List of Warehouse Transfer
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

export default function TableWarehouseTransfer(props) {
  const userRoles = props?.userRoles;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState("");

  // const [dataEdit, setDataEdit] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const getAccessToken = localStorage.getItem("access_token");

  const [dataEdit, setDataEdit] = useState({
    id_po: null,
    id_customer: null,
    jumlah: null,
    from_warehouse: null,
    to_warehouse: null,
    tgl_keluar: null,
    tgl_masuk: null,
    tgl_staging: null,
    pic: null,
    sn_mesins: null,
  });
  const [dataById, setDataById] = useState([]);

  const bodyEdit = {
    // id: dataEdit.id,
    id_po: dataById?.id_po?.id,
    id_customer: dataById?.id_customer?.id,
    jumlah: dataById?.jumlah,
    from_warehouse: dataById?.from_warehouse?.id,
    to_warehouse: dataById?.to_warehouse?.id,
    tgl_keluar: moment(dataById?.tgl_keluar).format("YYYY-MM-DD HH:mm:ss"),
    tgl_masuk: moment(dataById?.tgl_masuk).format("YYYY-MM-DD HH:mm:ss"),
    tgl_staging: moment(dataById?.tgl_staging).format("YYYY-MM-DD HH:mm:ss"),
    pic: dataById?.pic?.id,
    sn_mesins: dataById?.sn_mesins,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const filteredData = props?.data?.filter(
    (row) =>
      row?.purchaseOrder?.po_master?.no_po_master
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.jumlah
        ?.toString()
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.from_warehouse?.gudang_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      row?.to_warehouse?.gudang_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      (row?.tgl_masuk &&
        moment(row?.tgl_masuk)
          .format("DD MMM YYYY")
          ?.toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      (row?.tgl_keluar &&
        moment(row?.tgl_keluar)
          .format("DD MMM YYYY")
          ?.toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      (row?.tgl_staging &&
        moment(row?.tgl_staging)
          .format("DD MMM YYYY")
          ?.toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      row?.pic?.name?.toLowerCase()?.includes(searched?.toLowerCase())
  );

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_profile");
      })
      .catch((err) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_profile");
        console.log(err);
      });
  };

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const formatDatePo = "YYYY-MM-DD HH:mm:ss";

  const handleEdit = async (id) => {
    const newBody = {
      id_po: dataEdit?.id_po?.id,
      id_customer: dataEdit?.id_customer?.id,
      jumlah: dataEdit?.jumlah,
      from_warehouse: dataEdit?.from_warehouse?.id,
      to_warehouse: dataEdit?.to_warehouse?.id,
      tgl_keluar: moment(dataEdit?.tgl_keluar).format("YYYY-MM-DD HH:mm:ss"),
      tgl_masuk: moment(dataEdit?.tgl_masuk).format("YYYY-MM-DD HH:mm:ss"),
      tgl_staging: moment(dataEdit?.tgl_staging).format("YYYY-MM-DD HH:mm:ss"),
      pic: dataEdit?.pic?.id,
      sn_mesins: dataEdit?.sn_mesins,
    };
    // console.log(newBody, 'newBody');
    // console.log(bodyEdit, 'bodyEdit');
    // console.log(dataById, 'dataById');
    setLoading(true);
    const response = await axios
      .put(`${api}warehouse-transfer/${id}`, newBody, config)
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Successfully Updated", // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: "top", // top bottom
              horizontal: "center", // left center right
            },
            variant: "success", // success error info warning null
          })
        );
        props.getData();
        dispatch(closeDialog());
        // setNum(num - 1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        const errStatus = err.response.status;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = "Bad Request!!";
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
    setOpen(false);
  };

  const handleClickOpens = (id, row) => {
    // console.log(row, 'rowxxx');
    setDataById(row);
    setDataEdit(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const wrapperBodyEdit = useCallback(
  //   (val) => {
  //     setDataById(val);
  //   },
  //   [setDataById, bodyEdit]
  // );

  const HandleDelete = async (id, e) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${api}warehouse-transfer/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Successfully Deleted!", // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: "top", // top bottom
              horizontal: "center", // left center right
            },
            variant: "success", // success error info warning null
          })
        );
        props.getData();
        dispatch(closeDialog());
      })
      .catch((err) => {
        props.setLoading(false);
        console.log(err);
        const errStatus = err.response.status;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
          dispatch(closeDialog());
        } else if (errStatus === 500) {
          messages = "Server Error!!";
          dispatch(closeDialog());
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
          dispatch(closeDialog());
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
          dispatch(closeDialog());
        } else if (errStatus === 400) {
          messages = "Bad Request!!";
          dispatch(closeDialog());
        } else {
          messages = "Something Wrong!!";
          dispatch(closeDialog());
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };

  const HanldleClickNotifDelete = (id, partNumber, e) => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => dispatch(closeDialog())}
              >
                Close
              </Button>
              <Button
                // disabled={props.setBody.partNumber === ''}
                variant="contained"
                color="error"
                onClick={(e) => HandleDelete(id, e)}
                autoFocus
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </div>
        ),
        maxWidth: "xl",
      })
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // console.log(props.data, 'props.dataxzz');

  const datas = filteredData?.map((item, index) =>
    createData(
      // index + 1,
      item?.id,
      item?.purchaseOrder,
      item?.customer,
      item?.jumlah,
      item?.from_warehouse,
      item?.to_warehouse,
      item?.tgl_keluar,
      item?.tgl_masuk,
      item?.tgl_staging,
      item?.pic,
      item?.sn_mesins
    )
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas?.map((n) => n.id);
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

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();
  const getJumlahEdit = dataById?.purchaseOrder?.jumlah - dataById?.jumlah;

  const truncateArray = (arr, maxLength) => {
    const truncatedArr = arr.join(", ");
    if (truncatedArr.length <= maxLength) {
      return truncatedArr;
    }
    return `${truncatedArr.substring(0, maxLength)}...(${
      arr.length
    } SN Machine)`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
        {/* Search field warehouse transfer */}
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

        <EnhancedTableToolbar
          HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <Dialog
          maxWidth="xl"
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Edit Data - Warehouse Transfers
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <HandleEditDetail
                userRoles={userRoles}
                setDataById={setDataById}
                setDataEdit={setDataEdit}
                loading={loading}
                dataEdit={dataEdit}
                body={props.body}
                setBody={props.setBody}
                dataById={dataById}
                handleClose={props.handleClose}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            {userRoles !== "GUEST" ||
            userRoles !== "OPERATOR_TSS" ||
            userRoles !== "GUEST_DIP" ? (
              <Button
                disabled={
                  // dataEdit?.jumlah > getJumlahEdit ||
                  dataEdit?.jumlah === null ||
                  dataEdit?.jumlah === "" ||
                  dataEdit?.pic === null ||
                  dataEdit?.jumlah < dataEdit?.sn_mesins?.length ||
                  dataEdit?.sn_mesins === null ||
                  dataEdit?.tgl_masuk === null ||
                  dataEdit?.tgl_staging === null ||
                  dataEdit?.sn_mesins === null ||
                  dataEdit?.to_warehouse === null ||
                  dataEdit?.tgl_keluar === null
                }
                variant="contained"
              >
                <div
                  className="hidden md:contents"
                  onClick={() => handleEdit(dataEdit.id)}
                >
                  Save
                </div>
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        </Dialog>
        <TableContainer sx={{ maxHeight: 440 }}>
          {props.loading === true ? (
            <FuseLoading />
          ) : datas?.length !== 0 ? (
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
                rowCount={datas?.length}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // console.log(row, 'CeeekRowwww');
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const data = [];
                    row?.sn_mesins.map((item, idx) => {
                      data.push(item?.snMesin);
                    });

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.purchaseOrder?.po_master?.no_po_master === ""
                            ? "-"
                            : row?.purchaseOrder?.po_master?.no_po_master}
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
                          {truncateArray(data, 22)}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.from_warehouse?.gudang_desc === ""
                            ? "-"
                            : row?.from_warehouse?.gudang_desc}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.to_warehouse?.gudang_desc === ""
                            ? "-"
                            : row?.to_warehouse?.gudang_desc}
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
                          {row?.tgl_keluar === null
                            ? "-"
                            : moment(row?.tgl_keluar).format("DD MMM YYYY")}
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
                          {row?.pic?.name === "" ? "-" : row?.pic?.name}
                        </TableCell>

                        <TableCell align="center">
                          <>
                            {userRoles === "OPERATOR_DIP" ||
                              (userRoles === "SUPERVISOR" && (
                                <div className="flex justify-center">
                                  <div>
                                    <IconButton
                                      onClick={() =>
                                        handleClickOpens(row.id, row)
                                      }
                                      color="info"
                                      className=""
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              ))}
                            {userRoles === "SUPER_ADMIN" ||
                            userRoles === "ADMIN" ? (
                              <div className="flex justify-center">
                                <div>
                                  <IconButton
                                    onClick={() =>
                                      handleClickOpens(row.id, row)
                                    }
                                    color="info"
                                    className=""
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </div>
                                <div>
                                  <IconButton
                                    // onClick={(e) => HandleDelete(row.id,row.partNumber, e)}
                                    onClick={(e) =>
                                      HanldleClickNotifDelete(row.id)
                                    }
                                    color="error"
                                    className=""
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </div>
                            ) : (
                              <>-</>
                            )}
                          </>
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
          count={datas?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
