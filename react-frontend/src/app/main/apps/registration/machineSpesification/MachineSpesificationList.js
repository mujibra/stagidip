/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  selectMachineSpesification,
  openNewMachineSpesificationDialog,
  openEditMachineSpesificationDialog,
} from './store/machineSpesificationSlice';
import MachineSpesificationTable from './MachineSpesificationTable';

function MachineSpesificationList(props) {
  const dispatch = useDispatch();
  const machineSpesification = useSelector(selectMachineSpesification);
  const totalElements = useSelector(
    ({ machineSpesificationApp }) => machineSpesificationApp.machineSpesification.totalElements
  );
  const searchText = useSelector(
    ({ machineSpesificationApp }) => machineSpesificationApp.machineSpesification.searchText
  );
  const [filteredData, setFilteredData] = useState(machineSpesification);

  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'ID Spesifikasi',
      //   accessor: 'id_spek',
      //   className: 'font-normal',
      //   sortable: true,
      // },
      // {
      //   Header: 'Item',
      //   accessor: 'item',
      //   className: 'font-normal',
      //   sortable: true,
      // },
      {
        Header: "Item",
        accessor: "item",
        className: 'font-normal',
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Action',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              title="Edit Spesifikasi Mesin"
              onClick={(ev) => {
                dispatch(openEditMachineSpesificationDialog(row.original));
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
        return machineSpesification;
      }
      return FuseUtils.filterArrayByString(machineSpesification, _searchText);
    }

    if (machineSpesification) {
      setFilteredData(getFilteredArray(machineSpesification, searchText));
    }
  }, [machineSpesification, searchText]);

  return (
    <>
      {props?.loading ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <FuseLoading />
        </div>
      ) : machineSpesification.length !== 0 ? (
        <>
          <div className="flex flex-row-reverse p-12">
            <Button
              variant="contained"
              color="primary"
              onClick={(ev) => dispatch(openNewMachineSpesificationDialog())}
            >
              Add Data
            </Button>
          </div>
          <MachineSpesificationTable
            columns={columns}
            data={filteredData}
            totalElements={totalElements}
            pages={props.page}
            setPage={props.setPage}
            rowsPerPage={props.rowsPerPage}
            setRowsPerPage={props.setRowsPerPage}
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
              onClick={(ev) => dispatch(openNewMachineSpesificationDialog())}
            >
              Add Data
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default MachineSpesificationList;
