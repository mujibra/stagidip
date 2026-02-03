import { Card, Typography } from '@mui/material';

export default function TotalCustomer() {
  return (
    <div>
      <Card>
        <Typography className="m-20 text-17 text-center" color="textSecondary">
          <b>Total Customer</b>
        </Typography>
        <Typography className="m-20 text-32 font-semibold text-center text-green-400">
          <b>100</b>
        </Typography>
        <Typography className="m-20 text-12 text-center" color="textSecondary">
          <b>Bank</b>
        </Typography>
      </Card>
    </div>
  );
}
