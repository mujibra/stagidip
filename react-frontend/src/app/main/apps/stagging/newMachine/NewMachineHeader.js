/* eslint-disable camelcase */
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
// import { useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { getOldMachine } from './store/oldmachineSlice';

function NewMachineHeader(props) {
  const dispatch = useDispatch();
  // const mainTheme = useSelector(selectMainTheme);
  const routeParams = useParams();

  const page = `${props.page}`;
  const rowsPerPage = `${props.rowsPerPage}`;
  useDeepCompareEffect(() => {
    dispatch(
      getOldMachine({ page, max: rowsPerPage, idPo: `${props?.idPo}` })
    ).then(() => console.log());
  }, [dispatch, routeParams]);

  const str = props.dataDetailOrder?.no_po;
  let file_name = null;
  if (str) {
    file_name = str.replace(/([^\w]+|\s+)/g, '_');
  }

  const format_file_name = `tmp_staging_${
    props.idPo.split('-')[0]
  }_${file_name}_${props.idPo.split('-')[1]}.xlsx`;

  return (
    <div className="flex left-0 flex-1 items-center container p-4 lg:p-24 lg:justify-items-stretch justify-items-start">
      <div className="flex w-full justify-items-start left-0">
        <Hidden lgUp>
          <IconButton aria-label="open left sidebar">
            <Icon>inventory</Icon>
          </IconButton>
        </Hidden>
        {props?.loading === true ? (
          <div className="w-1/2">
            <Typography variant="h6" className="mx-18 hidden md:flex">
              <div className="flex flex-wrap items-center">
                <Icon className="text-32">settings</Icon>
                <div>
                  Registrasi SN Mesin <span className="mr-5">:</span>
                </div>
                <div>
                  <div>
                    Loading...
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
              </div>
            </Typography>
            <div className="flex justify-between">
              <div>
                <div>
                  No.PO <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
                <div>
                  PN-System <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
                <div>
                  Customer <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  Type <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
                <div>
                  SN Batch <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>

                <div>
                  File Upload Must be <span className="mr-5">:</span>
                  <div>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // regis model

          <div className="w-8/12 ">
            <Typography
              variant="h6"
              className="mx-18 lg:text-10 hidden text-3 md:flex"
            >
              <div className="flex flex-wrap items-center ">
                <Icon className="hidden md:contents">settings</Icon>
                <div>
                  Registrasi Model <span className="mr-5">:</span>
                </div>
                <div>{props.dataDetailOrder?.mesin.type}</div>
              </div>
            </Typography>
            {/* colom 1 */}
            <div className="md:flex lg:text-8 grid grid-rows-1 gap-5 text-sm ">
              <div>
                <div>No PO :{props.dataDetailOrder?.no_po}</div>
                <div>
                  PN-System <span className="mr-5">:</span>
                  {props.dataDetailOrder?.part_number}
                </div>
                <div>
                  Customer <span className="mr-5">:</span>
                  {props.dataDetailOrder?.customer?.bank_desc}
                </div>
              </div>
              {/*  */}
              <div>
                <div>
                  Type <span className="mr-5">:</span>
                  {props.dataDetailOrder?.model?.name}
                </div>
                <div>
                  SN Batch <span className="mr-5">:</span>
                  {props.dataDetailOrder?.sn_batch}
                </div>
                <div>
                  File Upload <span className="mr-5">:</span>
                  {format_file_name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewMachineHeader;
