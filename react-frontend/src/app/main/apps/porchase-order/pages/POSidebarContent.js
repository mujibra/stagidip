import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import idLocale from 'date-fns/locale/id';
import TextField from '@mui/material/TextField';

function POSidebarContent(props) {
  const tglAwal = props.TglAwal;
  const tglAkhir = props.TglAkhir;
  const param = props.Parameter;
  // const orderStatus = props.OrderStatus;

  const handleCheckProses = () => {
    if (tglAwal.valueTglAwal && tglAkhir.valueTglAkhir) {
      // props.setDisplayContent(true);
      props.setOpenProses(false); // props.proses
    }
  };

  return (
    <div className="p-6 flex">
      {/* <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow"> */}
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={idLocale}>
        <DatePicker
          id="tanggalAwal"
          label="Purchase Order Date"
          value={tglAwal.valueTglAwal}
          onChange={date => tglAwal.setValueTglAwal(date)}
          renderInput={params => (
            <TextField {...params} className="m-4" variant="standard" />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={idLocale}>
        <DatePicker
          id="tanggalAkhir"
          label="Last Date"
          value={tglAkhir.valueTglAkhir}
          onChange={date => tglAkhir.setValueTglAkhir(date)}
          renderInput={params => (
            <TextField {...params} className="m-4" variant="standard" />
          )}
        />
      </LocalizationProvider>
      {/* </Paper> */}
    </div>
  );
}

export default POSidebarContent;
