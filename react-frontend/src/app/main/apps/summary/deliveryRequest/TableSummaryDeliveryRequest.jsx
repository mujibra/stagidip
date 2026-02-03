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

import FuseLoading from "@fuse/core/FuseLoading";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Button, Dialog, Divider, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import HandleApproval from "./action/HandleApproval";
import Cards from "./action/Cards";
import { HandleFormEdit } from "./action/HandleFormEdit";

const getUser = JSON.parse(localStorage.getItem("user_profile"));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}

const useStyles = makeStyles({
  tableCell: {
    minWidth: "150px",
    cursor: "pointer",
  },
  cursorTable: {
    cursor: "pointer",
  },
});

function createData(
  id,
  detail_po,
  address,
  tanggal_request,
  purpose,
  contact_person,
  contact_no,
  created_at,
  task,
  status_approval,
  request_by,
  category,
  detail_sn_mesin
) {
  return {
    id,
    detail_po,
    address,
    tanggal_request,
    purpose,
    contact_person,
    contact_no,
    created_at,
    task,
    status_approval,
    request_by,
    category,
    detail_sn_mesin,
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
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "tanggal_request",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "purpose",
    numeric: true,
    disablePadding: false,
    label: "Purpose",
  },
  {
    id: "contact_person",
    numeric: true,
    disablePadding: false,
    label: "Contact Person",
  },
  {
    id: "contact_no",
    numeric: true,
    disablePadding: false,
    label: "No Contact",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "request_by",
    numeric: true,
    disablePadding: false,
    label: "Request By",
  },
  {
    id: "gudang_desc",
    numeric: true,
    disablePadding: false,
    label: "Warehouse",
  },
  {
    id: "approve",
    numeric: true,
    disablePadding: false,
    label: "Approve",
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
          List of Delivery Request
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

export default function TableSummaryDeliveryRequest(props) {
  // console.log(props, 'props');
  const userRoles = props?.userRoles;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sumTotal = props?.sumTotal;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openShowData, setOpenShowData] = useState(false);
  // const [dataEdit, setDataEdit] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const getAccessToken = localStorage.getItem("access_token");
  const [dataById, setDataById] = useState([]);
  const data = props?.data;
  const getData = props?.getData;
  const [row, setRow] = useState({});
  const [trigger, setTrigger] = useState("");
  const [body, setBody] = useState({});
  const [bodyStatus, setBodyStatus] = useState("");
  const [bodyApprove, setBodyApprove] = useState(null);
  const [searched, setSearched] = useState("");

  // console.log(bodyStatus, 'bodyStatus');
  // console.log(bodyApprove, 'bodyApprove');

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const filteredData = props?.data?.filter((row) => {
    console.log(moment(row?.tanggal_request)?.format("LL"));
    return (
      row?.detail_po?.customer?.bank_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase()) ||
      (row?.tanggal_request &&
        moment(row?.tanggal_request)
          ?.format("LL")
          ?.toLowerCase()
          ?.includes(searched?.toLowerCase())) ||
      row?.purpose?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.contact_person?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.contact_no?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.address?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.request_by?.name?.toLowerCase()?.includes(searched?.toLowerCase()) ||
      row?.detail_po?.gudang?.gudang_desc
        ?.toLowerCase()
        ?.includes(searched?.toLowerCase())
    );
  });

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);
  const formatDatePo = "YYYY-MM-DD HH:mm:ss";

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // console.log(props.data, 'props.dataxzz');
  const datas = filteredData?.map((item, index) =>
    createData(
      item?.id,
      item?.detail_po,
      item?.address,
      item?.tanggal_request,
      item?.purpose,
      item?.contact_person,
      item?.contact_no,
      item?.created_at,
      item?.task,
      item?.status_approval,
      item?.request_by,
      item?.category,
      item?.detail_sn_mesin
    )
  );
  console.log(datas, "datasssssssss");
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleClickOpensShowData = (id, row) => {
    // setDataByIdEdit(row);
    setDataById(row);
    // if (userRoles === 'GUEST') {
    //   setOpenShowData(false);
    // } else {
    //   setOpenShowData(true);
    // }
    setOpenShowData(true);
  };
  const handleCloseShowData = () => {
    setOpen(false);
    setOpenShowData(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (rows, triggers) => {
    setOpen(true);
    setRow(rows);
    setTrigger(triggers);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();

  const sumTotalSummary = [
    {
      id: "sumTotal",
      name: "Sum Total",
      total: sumTotal,
    },
  ];
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}deliveryRequest/${row?.id}`,
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message: `Data Berhasil Di Hapus`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
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
        console.log(err);
      });
  };
  const handleEdit = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}deliveryRequest/${row?.id}`,
        body,
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message: `Data Berhasil Di Edit`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
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
        console.log(err);
      });
  };
  const handleApproval = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}updateApproval/${row?.id}`,
        { approve_by: body?.id, status_approval: bodyStatus },
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message:
              body === ""
                ? `successfully rejected`
                : `successfully approved by ${body?.name}`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
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
        console.log(err);
      });
  };
  const propsFromParrent = (dataEdit, status, approve) => {
    setBody(dataEdit);
    setBodyStatus(status);
    setBodyApprove(approve);
  };

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

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
        <EnhancedTableToolbar
          // HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <div className="dialoggg">
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {trigger === 0 ? `Edit` : trigger === 1 ? "Delete" : "Approval"}
            </DialogTitle>
            <Divider />
            <DialogContent className="mb-72">
              <DialogContentText id="alert-dialog-description">
                {trigger === 0 ? (
                  <HandleFormEdit
                    row={row}
                    propsFromParrent={propsFromParrent}
                  />
                ) : trigger === 1 ? (
                  `Apakah Anda Ingin Menghapus "${row?.purpose}"?`
                ) : (
                  <HandleApproval
                    row={row}
                    propsFromParrent={propsFromParrent}
                  />
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {trigger === 0 ? (
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={loading === true}
                  autoFocus
                >
                  {loading === true ? "...Loading" : "Edit"}
                </Button>
              ) : trigger === 1 ? (
                <Button variant="contained" onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              ) : bodyStatus === 1 ? (
                <Button
                  disabled={bodyStatus === null || bodyApprove === ""}
                  variant="contained"
                  onClick={handleApproval}
                  autoFocus
                >
                  Approve
                </Button>
              ) : (
                <Button
                  disabled={bodyStatus === null}
                  variant="contained"
                  onClick={handleApproval}
                  autoFocus
                >
                  Approve
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
        <Dialog open={openShowData} fullWidth maxWidth="md">
          <div className="w-full flex justify-between">
            <DialogTitle id="alert-dialog-title">Delivery Request</DialogTitle>
          </div>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Cards
                getData={getData}
                // dataById={dataById}
                userRoles={userRoles}
                setLoading={setLoading}
                loading={loading}
                data={data}
                dataById={[dataById]}
                // sumTotal={sumTotal}
                // getData={getData}
                // handleClose={handleClose}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseShowData}>
              Close
            </Button>
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
                    const isItemSelected = isSelected(row?.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event?.id)}
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
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.detail_po?.customer?.bank_desc === ""
                            ? "-"
                            : row?.detail_po?.customer?.bank_desc}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.tanggal_request &&
                            moment(row?.tanggal_request)?.format("LL")}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.purpose === null ? "-" : row?.purpose}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.contact_person === null
                            ? "-"
                            : row?.contact_person}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.contact_no === null ? "-" : row?.contact_no}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.address === null ? "-" : row?.address}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.request_by?.name === null
                            ? "-"
                            : row?.request_by?.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          {row?.detail_po?.gudang?.gudang_desc === null
                            ? "-"
                            : row?.detail_po?.gudang?.gudang_desc}
                        </TableCell>
                        <TableCell
                          align="center"
                          // onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          <div className="w-full">
                            <Button
                              className="justify-start "
                              color={
                                row?.status_approval === null
                                  ? "info"
                                  : row?.status_approval === "1"
                                  ? "success"
                                  : row?.status_approval === "0"
                                  ? "warning"
                                  : "error"
                              }
                              variant="contained"
                              disabled={
                                userRoles === "OPERATOR_DIP" ||
                                userRoles === "GUEST" ||
                                userRoles === "GUEST_RELATED" ||
                                userRoles === "GUEST_BANK" ||
                                userRoles === "OPERATOR_MOVER" ||
                                userRoles === "OPERATOR_TSS"
                              }
                              onClick={() => handleClickOpen(row, 2)}
                            >
                              {row?.status_approval === null
                                ? "Approval"
                                : row?.status_approval === "1"
                                ? "Approved"
                                : row?.status_approval === "0"
                                ? "Reject"
                                : "Cancel"}
                            </Button>
                          </div>
                        </TableCell>
                        {/* <TableCell
                          align="center"
                          // onClick={() => handleClickOpensShowData(row?.id, row)}
                          className={classes?.tableCell}
                        >
                          <div className=" flex  w-full">
                            <div className="w-full flex justify-end">
                              <IconButton
                                onClick={() => handleClickOpen(row, 0)}
                                className="justify-end p-2 "
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                onClick={() => handleClickOpen(row, 1)}
                                className="justify-start"
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </TableCell> */}
                        <TableCell
                          className={classes?.tableCell}
                          align="center"
                        >
                          <div className="flex w-full">
                            <div className=" flex justify-end">
                              {userRoles === "SUPER_ADMIN" ||
                              userRoles === "ADMIN" ||
                              userRoles === "SUPERVISOR" ? (
                                <IconButton
                                  onClick={() => handleClickOpen(row, 0)}
                                  className="justify-end p-2 "
                                  color="primary"
                                >
                                  <EditIcon />
                                </IconButton>
                              ) : (
                                <>-</>
                              )}
                              {userRoles === "SUPER_ADMIN" ||
                              userRoles === "ADMIN" ? (
                                <IconButton
                                  onClick={() => handleClickOpen(row, 1)}
                                  className="justify-start"
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
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
      {/* <div className="py-10 px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-between">
          {sumTotalSummary?.map(el => (
            <div
              key={el?.id}
              className="border border-gray-300 rounded-md m-10 py-4 px-4 text-center"
            >
              <p className="text-xs font-medium text-gray-700">{el?.name}</p>
              <p className="text-md font-bold mt-2">{el?.total}</p>
            </div>
          ))}
        </div>
      </div> */}
    </Box>
  );
}
