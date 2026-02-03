import FuseAnimate from "@fuse/core/FuseAnimate";
// import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { Typography } from "@mui/material";

function StatusDeliveryHeader(props) {
  // const mainTheme = useSelector(selectMainTheme);
  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      {/* <div className="flex flex-shrink items-center sm:w-224"> */}
      <div className="flex items-center">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography
            className="flex items-left mt-20 sm:mb-12 flex-col"
            color="inherit"
          >
            <Typography
              className="pb-10 sm:flex mx-0 sm:mx-12 text-xl"
              variant="h3"
            >
              STATUS OF DELIVERY
            </Typography>
            <Typography
              className="pb-10 sm:flex mx-0 sm:mx-12 text-xs"
              variant="h5"
            >
              List of Status Delivery
            </Typography>
          </Typography>
        </FuseAnimate>
      </div>
      {/* </div> */}
    </div>
  );
}

export default StatusDeliveryHeader;
