/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { AppBar, CircularProgress, Dialog, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import OpenExteriorCheck from './openMV400/OpenExteriorCheck';
import OpenExteriorCheck2 from './openMV400/OpenExteriorCheck2';
import OpenExteriorCheckEdit from './openMV400/OpenExteriorCheckEdit';
import OpenExteriorCheck2Edit from './openMV400/OpenExteriorCheck2Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const columns = [
  { id: 'no', label: 'NO', minWidth: 50 },
  { id: 'division', label: 'Division', minWidth: 100 },
  {
    id: 'test',
    label: 'Test',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, name, checklistStaging, staging_checklist) {
  return { id, name, checklistStaging, staging_checklist };
}

export default function OpenMV400(props) {
  // console.log(props, 'props');
  const classes = useStyles();
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const idPO = props?.dataById?.id;
  const dataHeader = props?.dataById;
  const getUser = JSON.parse(localStorage.getItem("user_profile"));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const getIdMesin = props?.getIdMesin;
  // console.log(getIdMesinPo, 'getIdMesinPo');
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dataById = props?.dataById;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [datas, setDatas] = useState([]);
  const [body, setbody] = useState([]);
  const [open, setOpen] = useState(false);
  const [getIdDivision, setIdDivision] = useState('');
  const [getIdDivisionForParent, setgetIdDivisionForParent] = useState('');
  // console.log(getIdDivisionForParent, 'getIdDivisionForParent')
  const [getDisable, setGetDisable] = useState(false);
  const [getIdx, setGetgetIdx] = useState('');
  const [getTriggerAddEdit, setGetTriggerAddEdit] = useState('');
  const [getErrImg, setgetErrImg] = useState(0);
  // console.log(getIdDivision, 'getIdDivision');
  // console.log(getIdDivision?.id, 'getIdDivision');
  const handleOpen = (row, index, triggerAddEdit) => {
    // console.log(row, 'row');
    setGetgetIdx(index);
    setOpen(true);
    setIdDivision(row);
    setGetDisable(row?.staging_checklist);
    setGetTriggerAddEdit(triggerAddEdit);
  };
  // console.log(datas, 'datas');
  const rows = datas?.map((item, index) =>
    createData(item?.id, item?.name, item?.checklistStaging, item?.staging_checklist)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const getData = async () => {
    if (open === true) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    const response = await axios
      .get(
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}dataTableChecklist/${getIdMesinPo}`,
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/${idPO}/${getIdMesin?.idMesin}/spek`,
        config
      )
      .then((res) => {
        setDatas(res?.data?.data);
        setLoading(false);
        setGetDisable(res?.data?.data[getIdx].staging_checklist);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setDatas([]);
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const pullData = (data, getIdDivisionForParents) => {
    setbody(data);
    setgetIdDivisionForParent(getIdDivisionForParents);
  };
  const pullDataErrImg = (errImg) => {
    setgetErrImg(errImg);
  };
  // console.log(body, 'data from child');

  const handleEdit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/${idPO}/${getIdMesin?.idMesin}/${getIdDivisionForParent}`,
        body,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Updated',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        console.log(errStatus, 'errStatus');
        const errMessage = err.response.data.errorMessage;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
    // setLoadingBtn(false);
  };
  const handleSubmit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400`, body, config)
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 413) {
          messages = errMessage;
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
    // setLoadingBtn(false);
  };
  const handleClose = () => {
    props?.getOK();
    props?.getNG();
    props?.getNA();
    setOpen(false);
    getData();
  };
  // console.log(getIdDivision.id, 'getIdDivision');
  const getIdDivisionMX5600S = getIdDivision?.id;
  // console.log(getIdDivision, 'getIdDivision')

  return (
    <Paper sx={{ width: '100%' }}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography
              className="flex"
              sx={{ ml: 2, flex: 1 }}
              variant="subtitle1"
              component="div"
            >
              <div className="flex">
                <div className="">
                  <div>SN MESIN : {getIdMesin?.snMesin === null ? '-' : getIdMesin?.snMesin} </div>
                  <div>
                    Model : {dataHeader?.mesin?.type === null ? '-' : dataHeader?.mesin?.type}
                  </div>
                  <div>
                    PN System : {dataHeader?.part_number === null ? '-' : dataHeader?.part_number}{' '}
                  </div>
                  <div>
                    PIC Datindo:{' '}
                    {dataHeader?.pic_staging?.name === null ? '-' : dataHeader?.pic_staging?.name}{' '}
                  </div>
                </div>
              </div>
            </Typography>
            {getTriggerAddEdit === 1 ? (
              <>
                {loadingBtn === true ? (
                  <Button
                    disabled
                    startIcon={<CircularProgress size="2rem" />}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    disabled={
                      getDisable === true ||
                      userRoles === 'GUEST' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'GUEST_RELATED' ||
                      userRoles === 'OPERATOR_MOVER'
                      // || getErrImg > 2097152
                    }
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <>
                {loadingBtn === true ? (
                  <Button
                    disabled
                    startIcon={<CircularProgress size="2rem" />}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    // onClick={handleEdit}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'GUEST_RELATED' ||
                      userRoles === 'OPERATOR_MOVER'
                    }
                    // disabled={getDisable === true}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        {getTriggerAddEdit === 1 ? (
          getIdDivision?.id === 1 || getIdDivision?.id === 3 || getIdDivision?.id === 4 ? (
            <>
              <OpenExteriorCheck
                userRoles={userRoles}
                dataHeader={dataHeader}
                dataById={dataById}
                idPO={idPO}
                getIdMesin={getIdMesin}
                datas={datas}
                getData={getData}
                getIdDivision={getIdDivision}
                pullData={pullData}
                getDisable={getDisable}
                handleOpen={handleOpen}
              />
            </>
          ) : getIdDivision?.id === 2 ? (
            <>
              <OpenExteriorCheck2
                userRoles={userRoles}
                dataHeader={dataHeader}
                dataById={dataById}
                idPO={idPO}
                getIdMesin={getIdMesin}
                datas={datas}
                getData={getData}
                getIdDivision={getIdDivision}
                pullData={pullData}
                getDisable={getDisable}
                handleOpen={handleOpen}
              />
            </>
          ) : (
            <>err</>
          )
        ) : getIdDivision?.id === 1 || getIdDivision?.id === 3 || getIdDivision?.id === 4 ? (
          <>
            <OpenExteriorCheckEdit
              userRoles={userRoles}
              dataHeader={dataHeader}
              dataById={dataById}
              idPO={idPO}
              getIdMesin={getIdMesin}
              datas={datas}
              getData={getData}
              getIdDivision={getIdDivision}
              pullData={pullData}
              getDisable={getDisable}
              handleOpen={handleOpen}
            />
          </>
        ) : getIdDivision?.id === 2 ? (
          <>
            <OpenExteriorCheck2Edit
              userRoles={userRoles}
              dataHeader={dataHeader}
              dataById={dataById}
              idPO={idPO}
              getIdMesin={getIdMesin}
              datas={datas}
              getData={getData}
              getIdDivision={getIdDivision}
              pullData={pullData}
              getDisable={getDisable}
              handleOpen={handleOpen}
            />
          </>
        ) : (
          <>err</>
        )}
      </Dialog>
      <TableContainer sx={{ maxHeight: 600 }}>
        {loading === true ? (
          <FuseLoading />
        ) : datas.length !== 0 ? (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  {dataById?.mesin?.type} Pre-Staging Checklist
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <>
                      <StyledTableRow>
                        <TableCell align="left" className={classes?.tableCell}>
                          {index + 1}.)
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.name === null ? '-' : row?.name}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          <div className="flex justify-center">
                            <div>
                              <IconButton
                                onClick={() => handleOpen(row, index, 1)}
                                color="info"
                                disabled={row.staging_checklist === true || loading === true}
                                // className="z-9999"
                              >
                                <PlaylistAddIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpen(row, index, 2)}
                                color="info"
                                disabled={row.staging_checklist === false}
                                // className="z-9999"
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </div>
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <>
            <div className="text-center m-20">
              <div>No Data Available</div>
            </div>
          </>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
