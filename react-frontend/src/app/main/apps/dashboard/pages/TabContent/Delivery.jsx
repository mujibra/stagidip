/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import DeliveryByCustomer from "../implementation/implementationDelivery/DeliveryByCustomer";
import DeliveryByType from "../implementation/implementationDelivery/DeliveryByType";

/* eslint-disable import/prefer-default-export */
export const Delivery = () => {
  return (
    <div>
        <div>
            <DeliveryByCustomer />
        </div>
        <div>
            <DeliveryByType />
        </div>
    </div>
  );
};

export default Delivery;
