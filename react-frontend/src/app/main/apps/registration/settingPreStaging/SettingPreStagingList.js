
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import {
    selectSettingPreStaging, 
    openNewSettingPreStagingDialog, 
    openEditSettingPreStagingDialog
} from './store/settingPreStagingSlice';
import { Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingPreStaggingTable from './SettingPreStagingTable';


function SettingPreStagingList(props) {
    const dispatch = useDispatch();
    const settingPreStaging = useSelector(selectSettingPreStaging);
    const totalElements = useSelector(({ settingPreStagingApp }) => settingPreStagingApp.settingPreStaging.totalElements);
    const searchText = useSelector(({ settingPreStagingApp }) => settingPreStagingApp.settingPreStaging.searchText);
    const [filteredData, setFilteredData] = useState(settingPreStaging);

    const columns = React.useMemo(
        () => [
             {
                Header: "Types",
                Cell: ({ row }) => 
                    row?.original?.types === 'DENOMINATION' ? 'Denomination' :
                    row?.original?.types === 'PROBLEM' ? 'Problem': 
                    row?.original?.types === 'ACTION' ? 'Action': 
                    row?.original?.types === 'REMARK' ? 'Remark':
                    row?.original?.types === 'KETERANGAN' ? 'Keterangan': 'Bill', 
                sortable: true,
                className: "font-bold",
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
                      title={`Edit Setting Pre Staging`}
                      onClick={(ev) => {
                        dispatch(openEditSettingPreStagingDialog(row.original))
                      }}
                      size="large"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </div>
                )
              }
        ], [dispatch]
    );

    useEffect(() => {
        function getFilteredArray(entities, _searchText) {
            if (_searchText.length === 0) {
              return settingPreStaging;
            }
            return FuseUtils.filterArrayByString(settingPreStaging, _searchText);
          }
      
          if (settingPreStaging) {
            setFilteredData(getFilteredArray(settingPreStaging, searchText));
          }
    }, [settingPreStaging, searchText]);

    if (props?.loading && settingPreStaging.length === 0) {
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
            ) : settingPreStaging.length !== 0 ? (
                <>
                    <div className="flex flex-row-reverse p-12">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(ev) => dispatch(openNewSettingPreStagingDialog())}
                        >
                            Add Data
                        </Button>
                    </div>
                    <SettingPreStaggingTable
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
                            onClick={(ev) => dispatch(openNewSettingPreStagingDialog())}
                        >
                        Add Data
                        </Button>
                    </div>
                </div>
            )}
        </>
    )

}
export default SettingPreStagingList;