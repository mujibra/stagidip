import { Paper, Typography } from '@mui/material';

/* eslint-disable import/prefer-default-export */
export const DemandGoodsBox = (props) => {
  const { data } = props;
  return (
    <div className="">
      <div className="w-full flex gap-10 mt-5 flex-col md:flex-row">
        {data.data.map((items) => (
          <Paper className="w-full flex flex-col justify-between basis-1/2">
            <div className="text-center py-5">
              <Typography className="text-40 font-semibold leading-nonecking-tighter">
                {items.nilai}
              </Typography>
              <Typography className="text-12 font-normal">Total Demand</Typography>
            </div>
            <Typography
              className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
              color="textSecondary"
            >
              <span className="truncate">See Details &gt;&gt;</span>
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
};
