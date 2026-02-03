/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import ReceivedByCustomer from "../implementation/implemenReceived/ReceivedByCustomer";
import ReceivedByType from "../implementation/implemenReceived/ReceivedByType";

/* eslint-disable import/prefer-default-export */
export const Received = () => {
  return (
    <div>
        <div>
            <ReceivedByCustomer />
        </div>
        <div>
            <ReceivedByType />
        </div>
    </div>
  );
};

export default Received;
