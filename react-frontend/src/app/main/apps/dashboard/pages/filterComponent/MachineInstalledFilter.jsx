import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { format } from 'date-fns';

const MachineInstalledFIlter = (props) => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);
  const months = Array.from({ length: 12 }, (_, index) => format(new Date(currentYear, index, 1), 'MMMM'));

  const handleMonthChange = (e) => {
    const selectedValue  = e.target.value;
    props.setMonth(selectedValue);
  };

  const handleYearChange = (e) => {
    const selectedValue = e.target.value;
    props.setYear(selectedValue);
  };

  return (
    <div className='w-3/12 flex gap-x-5 items-center p-12'>
      <Typography className='whitespace-nowrap mr-10'>Filter :</Typography>
      <FormControl fullWidth className='mb-7'>
        <InputLabel id="bulan-label">Bulan</InputLabel>
        <Select
          labelId="bulan-label"
          id={`${props.idFilter}-month`}
          variant="standard"
          value={props.month}
          onChange={handleMonthChange}
        >
          <MenuItem value="">- Choose -</MenuItem>
          {months.map((month, index) => (
            <MenuItem key={index} value={index + 1}>{month} </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className='mb-7'>
        <InputLabel id="tahun-label">Tahun</InputLabel>
        <Select
          labelId="tahun-label"
          id={`${props.idFilter}-year`}
          variant="standard"
          value={props.year}
          onChange={handleYearChange}
        >
          <MenuItem value="">- Choose -</MenuItem>
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MachineInstalledFIlter