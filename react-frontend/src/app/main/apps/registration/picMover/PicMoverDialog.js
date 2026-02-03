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
  addPicMover,
  closeEditPicMoverDialog,
  closeNewPicMoverDialog,
  updatePicMover,
  deletePicMover,
} from './store/picMoverSlice';
import { getPartNumber } from '../partNumber/store/partNumberSlice';

const defaultFormState = {
  gudang: '',
  pic_mover: '',
};

function PicMoverDialog(props) {
  const dispatch = useDispatch();
  const user_info = JSON.parse(localStorage.getItem('user_profile'));

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const picMoverDialog = useSelector(({ picMoverApp }) => picMoverApp.picMover.picMoverDialog);

  const [gudang, setGudang] = useState('');
  const handleGudangChange = (event) => {
    setGudang(event.target.value);
    setForm({
      ...form,
      gudang: event.target.value,
    });
  };

  const initDialog = useCallback(() => {
    if (picMoverDialog.type === 'edit' && picMoverDialog.data) {
      setForm({
        ...picMoverDialog.data,
        gudang: picMoverDialog?.data?.gudang,
      });
    }

    if (picMoverDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...picMoverDialog.data,
      });
    }
  }, [picMoverDialog.data, picMoverDialog.type, setForm]);

  useEffect(() => {
    if (picMoverDialog.props.open) {
      initDialog();
    }
  }, [picMoverDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return picMoverDialog.type === 'edit'
      ? dispatch(closeEditPicMoverDialog())
      : dispatch(closeNewPicMoverDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (picMoverDialog.type === 'new') {
      dispatch(
        addPicMover({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      setGudang('');
    } else {
      dispatch(
        updatePicMover({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
    }
    closeComposeDialog();
  }

  function canBeSubmitted() {
    return form.pic_mover.length > 0;
  }

  function handleRemove() {
    dispatch(
      deletePicMover({
        form,
        page: props.page,
        rowsPerPage: props.rowsPerPage,
      })
    ).then(() => dispatch(getPartNumber()));

    closeComposeDialog();
  }

  useEffect(() => {
    setGudang(picMoverDialog?.data?.gudang);
  }, [picMoverDialog?.data]);

  return (
    <>
      <Dialog
        classes={{
          paper: 'm-24 rounded-4',
        }}
        {...picMoverDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {picMoverDialog.type === 'new' ? 'Add PIC Mover' : 'Edit PIC Mover'}
            </Typography>
          </Toolbar>
        </AppBar>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
          <DialogContent classes={{ root: 'p-24' }}>
            <div>
              <div className="flex -mx-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Warehouse</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="gudang"
                    name="gudang"
                    value={gudang}
                    label="Type"
                    className="mb-10"
                    onChange={handleGudangChange}
                  >
                    <MenuItem value="WAHANA">DATINDO-WAHANA</MenuItem>
                    <MenuItem value="TOYO">DATINDO-TOYO</MenuItem>
                    <MenuItem value="CEPI">DATINDO-CEPI</MenuItem>
                    <MenuItem value="CITRA">DATINDO-CITRA</MenuItem>
                  </Select>
                </FormControl>
                &nbsp;
                <TextField
                  className="mb-10"
                  label="Pic Mover"
                  id="pic_mover"
                  name="pic_mover"
                  type="text"
                  value={form.pic_mover}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          {picMoverDialog.type === 'new' ? (
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
              <IconButton onClick={handleRemove}>
                <Icon>delete</Icon>
              </IconButton>
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default PicMoverDialog;
