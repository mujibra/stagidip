import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, Button } from '@mui/material';
import PicMoverTable from './PicMoverTable';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  selectPicMover,
  openNewPicMoverDialog,
  openEditPicMoverDialog
} from './store/picMoverSlice';
import FuseUtils from '@fuse/utils/FuseUtils';

function PicMoverList(props) {
  const dispatch = useDispatch();
  const picMover = useSelector(selectPicMover);
  const totalElements = useSelector(({ picMoverApp }) => picMoverApp.picMover.totalElements);
  const searchText = useSelector(({ picMoverApp }) => picMoverApp.picMover.searchText);
  const [filteredData, setFilteredData] = useState(picMover);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Warehouse',
        accessor: 'gudang',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'PIC Mover',
        accessor: 'pic_mover',
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
              title="Edit PIC Mover"
              onClick={(ev) => {
                dispatch(openEditPicMoverDialog(row.original))
              }}
              size="large"
            >
              <EditIcon color="primary" />
            </IconButton>
          </div>
        )
      }
    ],
    [dispatch]
  );


  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return picMover;
      }
      return FuseUtils.filterArrayByString(picMover, _searchText);
    }

    if (picMover) {
      setFilteredData(getFilteredArray(picMover, searchText));
    }
  }, [picMover, searchText]);

  if (props?.loading && picMover.length === 0) {
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
      ) : picMover.length !== 0 ? (
        <> 
          <div className="flex flex-row-reverse p-12">
            <Button
              variant="contained"
              color="primary"
              onClick={(ev) => dispatch(openNewPicMoverDialog())}
            >
              Add Data
            </Button>
          </div>
          <PicMoverTable
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
              onClick={(ev) => dispatch(openNewPicMoverDialog())}
            >
              Add Data
            </Button>
          </div>
        </div>
      )}

    </>)

}

export default PicMoverList;