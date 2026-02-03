/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const columns = [
  { id: 'id_po', label: 'No', minWidth: 70 },
  { id: 'no_po', label: 'No PO/SPK', minWidth: 130 },
  { id: 'customer_name', label: 'Customer', minWidth: 130 },
  { id: 'quantity', label: 'Quantity', minWidth: 90 },
  { id: 'type_mesin', label: 'Type', minWidth: 90 },
  { id: 'total_kirim', label: 'Total Delivery', minWidth: 90 },
  { id: 'persen_kirim', label: '% Delivery', minWidth: 90 },
  { id: 'total_activated', label: 'Total Activation', minWidth: 90 },
  { id: 'total_ba', label: 'Total BA', minWidth: 90 },
  { id: 'persen_ba', label: '% BA', minWidth: 90 },
  { id: 'persen_ba', label: 'BA Not Available', minWidth: 90 },
  { id: 'total_kirim', label: 'Not Delivered', minWidth: 90 },
  { id: 'total_kirim', label: '% Activation', minWidth: 110 },
  { id: 'total_kirim', label: 'Activation Not Available', minWidth: 90 },
];

function createData(
  id_po,
  no_po,
  customer_name,
  quantity,
  type_mesin,
  total_kirim,
  persen_kirim,
  total_activated,
  total_ba,
  persen_ba
) {
  return {
    id_po,
    no_po,
    customer_name,
    quantity,
    type_mesin,
    total_kirim,
    persen_kirim,
    total_activated,
    total_ba,
    persen_ba,
  };
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 5,
  },
}));
export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [sumQuantity, setsumQuantity] = useState(0);
  const [sumTotalDelivery, setsumTotalDelivery] = useState(0);
  const [averagePercenDelivery, setaveragePercenDelivery] = useState(0);
  const [sumTotalActivation, setsumTotalActivation] = useState(0);
  const [sumTotalBA, setsumTotalBA] = useState(0);
  const [averagePercenBA, setaveragePercenBA] = useState(0);
  const [sumBANA, setsumBANA] = useState(0);
  const [sumNotDelivery, setsumNotDelivery] = useState(0);
  const [averagePercenActivation, setaveragePercenActivation] = useState(0);
  const [sumActivationNA, setsumActivationNA] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const rows = data?.map((item, index) =>
    createData(
      item?.id_po,
      item?.no_po,
      item?.customer_name,
      item?.quantity,
      item?.type_mesin,
      item?.total_kirim,
      item?.persen_kirim,
      item?.total_activated,
      item?.total_ba,
      item?.persen_ba
    )
  );
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then(res => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}implement-summary/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      )
      .then(res => {
        setData(res?.data?.data);
        setsumQuantity(
          (res?.data?.data).reduce((total, obj) => total + obj?.quantity, 0)
        );
        setsumTotalDelivery(
          (res?.data?.data).reduce((total, obj) => total + obj?.total_kirim, 0)
        );
        // setaveragePercenDelivery
        setsumTotalActivation(
          (res?.data?.data).reduce(
            (total, obj) => total + obj?.total_activated,
            0
          )
        );
        setsumTotalBA(
          (res?.data?.data).reduce((total, obj) => total + obj?.total_ba, 0)
        );
        // setaveragePercenBA
        setsumBANA(
          (res?.data?.data).reduce(
            (total, obj) => total + (obj?.total_activated - obj?.total_ba),
            0
          )
        );
        setsumNotDelivery(
          (res?.data?.data).reduce(
            (total, obj) => total + (obj?.quantity - obj?.total_kirim),
            0
          )
        );
        // setaveragePercenActivation
        setsumActivationNA(
          (res?.data?.data).reduce(
            (total, obj) => total + (obj?.total_kirim - obj?.total_activated),
            0
          )
        );
        setLoading(false);
        // console.log(res.data);
      })
      .catch(err => {
        setData([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
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
        setLoading(false);
        console.log(err);
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
  // console.log(data, 'data');
  // data?.map => ((row, index) => {
  //   return(
  //     row?.quantity[index]+row?.quantity[index+1]
  //   )
  // })

  const sumTotalSummary = [
    {
      id: 'sumQuantity',
      name: 'Sum Quantity',
      total: sumQuantity,
    },
    {
      id: 'sumTotalDelivery',
      name: 'Sum Total Delivery',
      total: sumTotalDelivery,
    },
    // {
    //   id: 'average%Delivery',
    //   name: 'Average % Delivery',
    //   total: averagePercenDelivery,
    // },
    {
      id: 'sumTotalActivation',
      name: 'Sum Total Activation',
      total: sumTotalActivation,
    },
    {
      id: 'sumTotalBA',
      name: 'Sum Total BA',
      total: sumTotalBA,
    },
    // {
    //   id: 'average%BA',
    //   name: 'Average % BA',
    //   total: averagePercenBA,
    // },
    {
      id: 'sumBAN/A',
      name: 'Sum BA N/A',
      total: sumBANA,
    },
    {
      id: 'sumNotDelivery',
      name: 'Sum Not Delivery',
      total: sumNotDelivery,
    },
    // {
    //   id: 'average%Activation',
    //   name: 'Average % Activation ',
    //   total: averagePercenActivation,
    // },
    {
      id: 'sumActivationN/A',
      name: 'Sum Activation N/A',
      total: sumActivationNA,
    },
  ];
  if (loading === true) {
    return <FuseLoading />;
  }
  if (data?.length === 0) {
    return (
      <div className=" w-full flex justify-center m-10">
        <div>Empty Data</div>
      </div>
    );
  }
  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                    <StyledTableRow key={row.id}>
                      <TableCell align="center" className={classes?.tableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.no_po === null ? '-' : row?.no_po}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.customer_name === null ? '-' : row?.customer_name}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.quantity === null ? 0 : row?.quantity}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.type_mesin === null ? '-' : row?.type_mesin}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.total_kirim === null ? 0 : row?.total_kirim}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.persen_kirim === null
                          ? `${0}%`
                          : `${row?.persen_kirim}%`}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.total_activated === null
                          ? 0
                          : row?.total_activated}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.total_ba === null ? 0 : row?.total_ba}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.persen_ba === null
                          ? `${0}%`
                          : `${row?.persen_ba}%`}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {(row?.total_activated === null
                          ? 0
                          : row?.total_activated) -
                          (row?.total_ba === null ? 0 : row?.total_ba)}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {(row?.quantity === null ? 0 : row?.quantity) -
                          (row?.total_kirim === null ? 0 : row?.total_kirim)}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {`${
                          Math.round(
                            ((row?.total_activated === null
                              ? 0
                              : row?.total_activated) *
                              100) /
                              (row?.total_kirim === null ? 0 : row?.total_kirim)
                          ) === Infinity ||
                          isNaN(
                            Math.round(
                              ((row?.total_activated === null
                                ? 0
                                : row?.total_activated) *
                                100) /
                                (row?.total_kirim === null
                                  ? 0
                                  : row?.total_kirim)
                            )
                          ) === true
                            ? 0
                            : Math.round(
                                ((row?.total_activated === null
                                  ? 0
                                  : row?.total_activated) *
                                  100) /
                                  (row?.total_kirim === null
                                    ? 0
                                    : row?.total_kirim)
                              )
                        }%`}
                        {/* {console.log( isNaN(null / null) === true ? 0 : 'bukan nan' )} */}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {(row?.total_kirim === null ? 0 : row?.total_kirim) -
                          (row?.total_activated === null
                            ? 0
                            : row?.total_activated)}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="py-10 px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center justify-between">
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
      </div>
    </div>
  );
}
