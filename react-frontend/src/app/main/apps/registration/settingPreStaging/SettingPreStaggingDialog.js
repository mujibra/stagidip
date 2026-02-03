/* eslint-disable camelcase */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from '@fuse/hooks';
import {
  AppBar,
  Dialog,
  DialogActions,
  Button,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';
import {
  addSettingPreStaging,
  updateSettingPreStaging,
  deleteSettingPreStaging,
  closeNewSettingPreStagingDialog,
  closeEditSettingPreStagingDialog,
} from './store/settingPreStagingSlice';
import { getPartNumber } from '../partNumber/store/partNumberSlice';

const defaultFormState = {
  types: '',
  description: '',
};

function SettingPreStaggingDialog(props) {
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultFormState);
  const user_info = JSON.parse(localStorage.getItem('user_profile'));

  const settingPreStagingDialog = useSelector(
    ({ settingPreStagingApp }) => settingPreStagingApp.settingPreStaging.settingPreStagingDialog
  );

  const [types, setTypes] = useState('');
  const handleTypesChange = (event) => {
    setTypes(event.target.value);
    setForm({
      ...form,
      types: event.target.value,
    });
  };

  const initDialog = useCallback(() => {
    if (settingPreStagingDialog.type === 'edit' && settingPreStagingDialog.data) {
      setForm({
        ...settingPreStagingDialog.data,
        types: settingPreStagingDialog?.data?.types,
      });
    }

    if (settingPreStagingDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...settingPreStagingDialog.data,
      });
    }
  }, [settingPreStagingDialog.data, settingPreStagingDialog.type, setForm]);

  useEffect(() => {
    if (settingPreStagingDialog.props.open) {
      initDialog();
    }
  }, [settingPreStagingDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return settingPreStagingDialog.type === 'edit'
      ? dispatch(closeEditSettingPreStagingDialog())
      : dispatch(closeNewSettingPreStagingDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (settingPreStagingDialog.type === 'new') {
      dispatch(
        addSettingPreStaging({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      setTypes('');
    } else {
      dispatch(
        updateSettingPreStaging({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(
      deleteSettingPreStaging({
        form,
        page: props.page,
        rowsPerPage: props.rowsPerPage,
      })
    ).then(() => dispatch(getPartNumber()));

    closeComposeDialog();
  }

  function canBeSubmitted() {
    return form.description.length > 0;
  }

  useEffect(() => {
    setTypes(settingPreStagingDialog?.data?.types);
  }, [settingPreStagingDialog.data]);

  // console.log("CeekPagee", props);

  return (
    <>
      <Dialog
        classes={{
          paper: 'm-24 rounded-4',
        }}
        {...settingPreStagingDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {settingPreStagingDialog.type === 'new'
                ? 'Add Setting Pre Staging'
                : 'Edit Setting Pre Staging'}
            </Typography>
          </Toolbar>
        </AppBar>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
          <DialogContent classes={{ root: 'p-24' }}>
            <div>
              <div className="flex -mx-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Types</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="types"
                    name="types"
                    value={types}
                    label="Type"
                    className="mb-10"
                    onChange={handleTypesChange}
                  >
                    <MenuItem value="PROBLEM">Problem</MenuItem>
                    <MenuItem value="ACTION">Action</MenuItem>
                    <MenuItem value="REMARK">Remark</MenuItem>
                    <MenuItem value="DENOMINATION">Denomination</MenuItem>
                    <MenuItem value="BILL_CHECKER_UNIT">Bill</MenuItem>
                    <MenuItem value="Information">Information </MenuItem>
                  </Select>
                </FormControl>
                &nbsp;
                <TextField
                  className="mb-10"
                  label="Description"
                  id="description"
                  name="description"
                  type="text"
                  value={form.description}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          {settingPreStagingDialog.type === 'new' ? (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!canBeSubmitted()}
                >
                  Add
                </Button>{' '}
                &nbsp;
                <Button variant="contained" color="secondary" onClick={closeComposeDialog}>
                  Close
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!canBeSubmitted()}
                  className="mr-4"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeComposeDialog}
                  className="mr-4"
                >
                  Close
                </Button>
              </div>
              {user_info[0]?.roles !== 'SUPERVISOR' && (
                <IconButton onClick={handleRemove}>
                  <Icon>delete</Icon>
                </IconButton>
              )}
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default SettingPreStaggingDialog;
