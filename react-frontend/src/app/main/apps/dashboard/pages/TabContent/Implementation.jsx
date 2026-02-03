/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import ReceivedByCustomer from "../implementation/implemenReceived/ReceivedByCustomer";
import ReceivedByType from "../implementation/implemenReceived/ReceivedByType";
import ActivationByType from "../implementation/implementationActivation/ActivationByType";
import MachineActivByCust from "../implementation/implementationActivation/MachineActivByCust";
import DeliveryByCustomer from "../implementation/implementationDelivery/DeliveryByCustomer";
import DeliveryByType from "../implementation/implementationDelivery/DeliveryByType";

/* eslint-disable import/prefer-default-export */
export const Implementation = () => {
  return (
    <div>
        <div>
            <MachineActivByCust />
        </div>
        <div>
            <ActivationByType />
        </div>
        <div>
            <DeliveryByCustomer />
        </div>
        <div>
            <DeliveryByType />
        </div>
        <div>
            <ReceivedByCustomer />
        </div>
        <div>
            <ReceivedByType />
        </div>
    </div>
  );
};

export default Implementation;
