import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/* eslint-disable import/prefer-default-export */
export const MonitorPerformere = (props) => {
  //   console.log(props, 'props');
  console.log(props, 'data');
  const data = props.dummyMonitorPerformance;

  //   function handleChangeRange(ev) {
  //     setCurrentRange(ev.target.value);
  //   }
  return (
    <div className=" w-full flex gap-10 mt-5 flex-col md:flex-row ">
      {data.data.map((items) => (
        <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between px-4 pt-8">
            <Typography className="mx-16 text-17" color="textSecondary">
              {items.header}
            </Typography>
            <IconButton aria-label="more" size="large">
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
          <div className="text-center py-12">
            <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
              {items.nilai}
            </Typography>
            <Typography className="text-18 text-blue-800 font-normal">{items.body}</Typography>
          </div>
          <Typography
            className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
            color="textSecondary"
          >
            <span className="truncate">{items.footer}</span>:
            <b className="px-8">{items.footerValue}</b>
          </Typography>
        </Paper>
      ))}
    </div>
  );
};
