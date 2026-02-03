import { useForm } from "@fuse/hooks";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Dialog,
  DialogActions,
  Button,
  Typography,
  Toolbar,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import {
  addStatusDeliveryDetail,
  updateStatusDeliveryDetail,
  closeNewStatusDeliveryDetailDialog,
  closeEditStatusDeliveryDetailDialog,
} from "./store/statusDeliveryDetailSlice";

const defaultFormState = {
  id_header: "",
  status: "",
  keterangan: "",
};

function StatusDeliveryDetailDialog(props) {
  const dispatch = useDispatch();

  const statusDeliveryDetailDialog = useSelector(
    ({ statusDeliveryApp }) =>
      statusDeliveryApp.statusDeliveryDetail.statusDeliveryDetailDialog
  );
  const statusDeliveryDialog = useSelector(
    ({ statusDeliveryApp }) =>
      statusDeliveryApp.statusDelivery.statusDeliveryDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setForm({
      ...form,
      id_header: statusDeliveryDialog?.data?.id,
      status: event.target.value,
    });
  };

  function closeComposeDialog() {
    return statusDeliveryDetailDialog.type === "edit"
      ? dispatch(closeEditStatusDeliveryDetailDialog())
      : dispatch(closeNewStatusDeliveryDetailDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (statusDeliveryDetailDialog.type === "new") {
      dispatch(
        addStatusDeliveryDetail({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      setStatus("");
      setForm({
        keterangan: "",
      });
    } else {
      dispatch(
        updateStatusDeliveryDetail({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
    }
    closeComposeDialog();
  }

  function canBeSubmitted() {
    return form.keterangan.length > 0;
  }

  const initDialog = useCallback(() => {
    if (
      statusDeliveryDetailDialog.type === "edit" &&
      statusDeliveryDetailDialog.data
    ) {
      setForm({
        ...statusDeliveryDetailDialog.data,
        status: statusDeliveryDetailDialog.data?.status,
      });
    }

    if (statusDeliveryDetailDialog.type === "new") {
      setForm({
        ...defaultFormState,
        ...statusDeliveryDetailDialog.data,
        // id_po: statusDeliveryDialog.data?.valuePO?.id
      });
    }
  }, [
    statusDeliveryDetailDialog.data,
    statusDeliveryDetailDialog.type,
    setForm,
  ]);

  useEffect(() => {
    if (statusDeliveryDetailDialog.props.open) {
      initDialog();
    }
  }, [statusDeliveryDetailDialog.props.open, initDialog]);

  useEffect(() => {
    setStatus(statusDeliveryDetailDialog?.data?.status);
  }, [statusDeliveryDetailDialog?.data]);

  return (
    <>
      <Dialog
        classes={{
          paper: "m-20 rounded-4",
        }}
        {...statusDeliveryDetailDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {statusDeliveryDetailDialog.type === "new"
                ? "Add Status Delivery"
                : "Edit Status Delivery"}
            </Typography>
          </Toolbar>
        </AppBar>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col md:overflow-hidden"
        >
          <DialogContent classes={{ root: "p-24" }}>
            <div>
              <div className="flex -mx-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    name="status"
                    value={status}
                    label="Type"
                    className="mb-10"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="LOADING">Loading</MenuItem>
                    <MenuItem value="PERJALANAN">Perjalanan</MenuItem>
                    <MenuItem value="TIBA">Tiba</MenuItem>
                    {/* <MenuItem value="AKTIVASI">Aktivasi</MenuItem>
                    <MenuItem value="SERAH_TERIMA">Serah Terima</MenuItem> */}
                  </Select>
                </FormControl>
                &nbsp;
                <TextField
                  className="mb-10"
                  label="Keterangan"
                  id="keterangan"
                  name="keterangan"
                  type="text"
                  value={form.keterangan}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          {statusDeliveryDetailDialog.type === "new" ? (
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
                </Button>{" "}
                &nbsp;
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeComposeDialog}
                >
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
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default StatusDeliveryDetailDialog;
