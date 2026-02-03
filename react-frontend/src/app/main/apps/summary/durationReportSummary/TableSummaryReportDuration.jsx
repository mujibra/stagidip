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
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
  useState,
  useEffect,
  // useCallback
} from 'react';

import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@mui/styles';

const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}

const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
  },
});

function createData(
  customer,
  type,
  model,
  specAvg,
  stagingAVG,
  preStagingAVG,
  preLoadingAVG,
  total_avg
) {
  return {
    customer,
    type,
    model,
    specAvg,
    stagingAVG,
    preStagingAVG,
    preLoadingAVG,
    total_avg,
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: 'NO',
    numeric: true,
    disablePadding: false,
    label: 'NO',
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'Customer',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'model',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'specAvg',
    numeric: true,
    disablePadding: false,
    label: 'Spesification Average',
  },
  {
    id: 'stagingAVG',
    numeric: true,
    disablePadding: false,
    label: 'Staging Average',
  },
  {
    id: 'preStagingAVG',
    numeric: true,
    disablePadding: false,
    label: 'Pre Staging Average',
  },
  {
    id: 'preLoadingAVG',
    numeric: true,
    disablePadding: false,
    label: 'Pre Loading Average',
  },
  // {
  //   id: 'totalMesin',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Total Mesin',
  // },
  {
    id: 'totalAverange',
    numeric: true,
    disablePadding: false,
    label: 'Total Averange',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
            align={headCell.id === 'no_po' ? 'left' : 'center'}
            // align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
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
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          className="text-white"
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className="text-white"
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of Duration Staging Summary
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

export default function TableSummaryReportDuration(props) {
  // console.log(props, 'ini props');
  const userRoles = props?.userRoles;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sumTotal = props?.sumTotal;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = props?.data;
  // console.log(data, 'ini data');
  // const [dataEdit, setDataEdit] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const getAccessToken = localStorage.getItem('access_token');

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const formatDatePo = 'YYYY-MM-DD HH:mm:ss';

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // console.log(props.data, 'props.dataxzz');

  const datas = data?.map((item, index) =>
    createData(
      item?.customer,
      item?.types,
      item?.models,
      item?.total_avg_specification,
      item?.total_avg_staging,
      item?.total_avg_checklist,
      item?.total_avg_preload,
      item?.total_avg
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();

  // const sumTotalSummary = [
  //   {
  //     id: 'sumTotal',
  //     name: 'Sum Total',
  //     total: sumTotal,
  //   },
  // ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <EnhancedTableToolbar
          // HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          {props.loading === true ? (
            <FuseLoading />
          ) : datas?.length !== 0 ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
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
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    // console.log(row, 'CeeekRowwww');
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

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
                        {/* <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.no_mesin === null ? '-' : row?.no_mesin}
                        </TableCell> */}
                          <TableCell align="center" className={classes?.tableCell}>
                      {rowsPerPage * page + index + 1}.)
                       </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.customer === null ? '-' : row?.customer}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.type === null ? '-' : row?.type}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.model === null ? '-' : row?.model}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.specAvg === null ? '-' : row?.specAvg}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.stagingAVG === null ? '-' : row?.stagingAVG}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.preStagingAVG === null ? '-' : row?.preStagingAVG}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.preLoadingAVG === null ? '-' : row?.preLoadingAVG}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.total_avg === null ? '-' : row?.total_avg}
                        </TableCell>
                        {/* <TableCell align="center" className={classes?.tableCell}>
                          -
                        </TableCell> */}
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
