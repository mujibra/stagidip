// import { useSelector } from 'react-redux';
import FuseAnimate from "@fuse/core/FuseAnimate";
// import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { Typography } from "@mui/material";

function MachineSpesificationHeader(props) {
  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      {/* <div className="flex flex-shrink items-center sm:w-224"> */}
      <div className="flex my-10 items-center">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography
            className="flex items-left mt-20 sm:mb-12 flex-col"
            color="inherit"
          >
            <Typography
              className="sm:font-xl sm:text-sm sm:flex mx-0 sm:mx-12 text-xl"
              variant="h3"
            >
              REGISTRATION - Machine Specification
            </Typography>
            <Typography
              className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xs"
              variant="h5"
            >
              List of Machine Specification
            </Typography>
          </Typography>
        </FuseAnimate>
      </div>
      {/* </div> */}
    </div>
  );
}

export default MachineSpesificationHeader;
