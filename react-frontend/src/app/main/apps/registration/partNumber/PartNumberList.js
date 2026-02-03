/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { showMessage } from 'app/store/fuse/messageSlice';
import PartNumberTable from './PartNumberTable';
import {
  openEditPartNumberDialog,
  selectPartNumber,
  openNewPartNumberDialog,
} from './store/partNumberSlice';

function PartNumberList(props) {
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const partNumber = useSelector(selectPartNumber);
  const searchText = useSelector(({ partNumberApp }) => partNumberApp.partNumber.searchText);
  const totalElements = useSelector(({ partNumberApp }) => partNumberApp.partNumber.totalElements);
  const [filteredData, setFilteredData] = useState(partNumber);

  const columns = React.useMemo(
    () => [
      // {
      //     Header: 'Id',
      //     accessor: 'id',
      //     className: 'font-normal',
      //     sortable: true,
      // },
      {
        Header: 'Type - Model',
        Cell: ({ row }) => (
          <>
            {row?.original?.mesin?.model?.name} - {row?.original?.mesin?.type}
          </>
        ),
        sortable: true,
      },
      {
        Header: 'Part Number',
        accessor: 'part_no',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Part Description',
        accessor: 'part_desc',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Type Mesin',
        accessor: 'types',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Status',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => <>{row?.original?.status === 1 ? 'Active' : 'Inactive'}</>,
      },
      {
        Header: 'Position',
        accessor: 'position',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Action',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* <IconButton
              title="Delete PartNumber"
              onClick={(ev) => {
                // console.log(row?.id);
                // deletePartNumber(row?.id);
                dispatch(openDeletePartNumberDialog(row?.id));
              }}
              size="large"
            >
              <DeleteIcon color="error" />
            </IconButton> */}
            <IconButton
              title="Edit PartNumber"
              onClick={(ev) => {
                dispatch(openEditPartNumberDialog(row.original));
              }}
              size="large"
            >
              <EditIcon color="primary" />
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return partNumber;
      }
      return FuseUtils.filterArrayByString(partNumber, _searchText);
    }

    if (partNumber) {
      setFilteredData(getFilteredArray(partNumber, searchText));
    }
  }, [partNumber, searchText]);

  if (props?.loading && partNumber.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <>
      {props?.loading ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <FuseLoading />
        </div>
      ) : partNumber.length !== 0 ? (
        <>
          {user_info[0]?.roles === 'SUPER_ADMIN' ||
          user_info[0]?.roles === 'ADMIN' ||
          user_info[0]?.roles === 'SUPERVISOR' ? (
            <div className="flex flex-row-reverse p-12">
              <Button
                variant="contained"
                color="primary"
                onClick={(ev) => dispatch(openNewPartNumberDialog())}
              >
                Add Data
              </Button>
            </div>
          ) : (
            ''
          )}
          <PartNumberTable
            columns={columns}
            data={filteredData}
            totalElements={totalElements}
            pages={props.page}
            setPage={props.setPage}
            rowsPerPage={props.rowsPerPage}
            setRowsPerPage={props.setRowsPerPage}
            onRowClick={(ev, row) => {
              if (row) {
                // dispatch(openEditCustomerDialog(row.original));
              }
            }}
          />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            No Data Available
          </Typography>
          <div className="flex flex-row-reverse p-12">
            <Button
              variant="contained"
              color="primary"
              onClick={(ev) => dispatch(openNewPartNumberDialog())}
            >
              Add Data
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PartNumberList;
