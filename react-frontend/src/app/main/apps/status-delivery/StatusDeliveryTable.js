/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import clsx from 'clsx';
import { Badge, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { openNewStatusDeliveryDialog } from './store/statusDeliverySlice';
import StatusDeliveryTablePaginationActions from './StatusDeliveryTablePaginationActions';

const EnhancedTable = (props) => {
  // console.log(props, 'props');
  const dispatch = useDispatch();
  const user_info = props?.user_info;
  const searched = props?.searched;
  const value = props?.value;
  const shouldLoading = searched !== value || props?.loading;
  // const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [date, setdate] = useState(null);
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  // console.log(page, 'page');
  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setPage(0);
    props.setRowsPerPage(Number(event.target.value));
  };

  useEffect(() => {
    setPageSize(props.rowsPerPage);
  }, [props.rowsPerPage]);
  // console.log(page, 'page');

  const handleSearch = (event) => {
    if (event) {
      props?.setSearched(event.target.value);
      props?.setdate(null);
    } else {
      props?.setSearched('');
    }
  };

  let ttlData;

  if (searched === '') {
    ttlData = props.totalElements;
  } else {
    ttlData = props.data?.length;
  }
  // useEffect(() => {
  //   if (searched === '') {
  //     setFilteredRows(page);
  //   } else {
  //     const filteredData = page?.filter((row) =>
  //       row?.original?.sn_mesin?.toLowerCase()?.includes(searched?.toLowerCase())
  //     );
  //     if (filteredData) {
  //       setFilteredRows(filteredData);
  //     }
  //   }
  // }, [props?.data, searched]);
  // console.log(props.totalElements, 'props.totalElements');
  // console.log(date, 'date');
  // console.log(moment().format('L'), 'date');
  // console.log(moment(date).format('L'), 'date');
  return (
    <div className="flex flex-col sm:border-1 sm:rounded-16 overflow-hidden">
      <div className=" w-full flex justify-between">
        <div className="p-10 w-1/3">
          <Badge
            badgeContent={searched === '' ? 0 : filteredRows?.length}
            color="primary"
            max={999}
          >
            <TextField
              fullWidth
              label="Search"
              value={searched}
              autoFocus
              onChange={handleSearch}
              id="standard-error-helper-text"
              variant="standard"
              style={{ marginBottom: '10px', marginLeft: '10px' }}
            />
            {shouldLoading && (
              <div className="p-1 mb-[10px] flex items-center">
                <CircularProgress thickness={5} size="2em" />
              </div>
            )}
          </Badge>
        </div>
        <div className="p-10 w-1/3 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={20}>
              <DesktopDatePicker
                label="Order Date"
                inputFormat="dd MMM yyyy"
                value={props?.date}
                // value={moment(body?.tgl_po).format('YYYY-MM-DD HH:mm:ss')}
                // fullWidth
                // disabled
                onChange={(newValue) => {
                  if (newValue) {
                    props?.setdate(moment(newValue).format('L'));
                    props?.setSearched('');
                  } else {
                    props?.setdate(null);
                  }
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
                placeholderText="Please select a date"
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </div>
      {props?.loading ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <FuseLoading />
        </div>
      ) : props?.statusDelivery.length !== 0 ? (
        <>
          <TableContainer className="flex flex-1" style={{ margin: 'auto', maxHeight: '630px' }}>
            <Table {...getTableProps()} stickyHeader size="small">
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    <TableCell className="whitespace-nowrap p-4 md:p-12">No.</TableCell>
                    {headerGroup.headers.map((column) => (
                      <TableCell
                        className="whitespace-nowrap p-4 md:p-12"
                        {...(!column.sortable
                          ? column.getHeaderProps()
                          : column.getHeaderProps(column.getSortByToggleProps()))}
                      >
                        {column.render('Header')}
                        {column.sortable ? (
                          <TableSortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                          />
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {page?.map((row, index) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      // onClick={(ev) => props.onRowClick(ev, row)}
                      className="truncate cursor-pointer"
                      style={{ height: '10px' }}
                    >
                      <TableCell className={clsx('p-4 sm:p-12')}>
                        {index + 1 + props.rowsPerPage * props.pages}
                      </TableCell>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell
                            {...cell.getCellProps()}
                            // className={clsx('p-4 md:p-12', cell.column.className)}
                          >
                            {cell.render('Cell')}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            classes={{
              root: 'flex-shrink-0 border-t-1',
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, { label: 'All', value: 99999 }]}
            colSpan={5}
            count={ttlData}
            rowsPerPage={searched === '' ? props.rowsPerPage : 99999}
            page={props.pages}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: false,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={StatusDeliveryTablePaginationActions}
          />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            No Data Available
          </Typography>
          {user_info[0]?.roles === 'SUPER_ADMIN' ||
          user_info[0]?.roles === 'ADMIN' ||
          user_info[0]?.roles === 'SUPERVISOR' ||
          user_info[0]?.roles === 'OPERATOR_MOVER' ? (
            <div className="flex flex-row-reverse p-12">
              <Button
                variant="contained"
                color="primary"
                onClick={(ev) => dispatch(openNewStatusDeliveryDialog())}
              >
                Add Data
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
