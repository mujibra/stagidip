/* eslint-disable react-hooks/exhaustive-deps */
// import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import { useEffect } from 'react';
import clsx from 'clsx';
import SettingPreStagingTablePaginations from './SettingPreStagingTablePaginations';

const EnhancedTable = (props) => {
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

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setPage(0);
    // setPageSize(Number(event.target.value));
    props.setRowsPerPage(Number(event.target.value));
  };

  useEffect(() => {
    setPageSize(props.rowsPerPage);
  }, [props.rowsPerPage]);

  return (
    <div className="flex flex-col sm:border-1 sm:rounded-16 overflow-hidden">
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
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  //   onClick={(ev) => props.onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                  // style={{ "height": "10px" }}
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
        rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: 99999 }]}
        colSpan={5}
        count={props.totalElements}
        rowsPerPage={props.rowsPerPage}
        page={props.pages}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: false,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={SettingPreStagingTablePaginations}
      />
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
