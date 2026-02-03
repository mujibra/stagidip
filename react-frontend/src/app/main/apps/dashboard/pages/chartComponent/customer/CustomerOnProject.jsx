import { Card, Typography } from '@mui/material';

export default function CustomerOnProject() {
  return (
    <div>
      <Card>
        <Typography className="m-20 text-17 text-center" color="textSecondary">
          <b>Customer on Project</b>
        </Typography>
        <Typography className="m-20 text-32 font-semibold text-center text-blue-600">
          <b>5</b>
        </Typography>
        <Typography className="m-20 text-12 text-center" color="textSecondary">
          <b>Bank</b>
        </Typography>
      </Card>
    </div>
  );
}
