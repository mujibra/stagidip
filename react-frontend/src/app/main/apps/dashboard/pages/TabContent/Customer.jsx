/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import CustomerOnProject from "../implementation/customer/CustomerOnProject";
import { JuamlahMesinPerCustomer } from "../implementation/customer/JuamlahMesinPerCustomer";
import NumberCustomer from "../implementation/customer/NumberCustomer";
import NumberCustomerOrders from "../implementation/customer/NumberCustomerOrders";
import TotalCustomer from "../implementation/customer/TotalCustomer";

/* eslint-disable import/prefer-default-export */
export const Customer = () => {
  return (
    <div>
        {/* <JuamlahMesinPerCustomer /> */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-between mt-20">
        <div className="grid grid-cols-1 col-span-1 gap-10">
            <div>
                <TotalCustomer />
            </div>
            <div>
                <CustomerOnProject />
            </div>
        </div>

        <div className="col-span-1 md:col-span-2">
            {/* <NumberCustomerOrders /> */}
            <NumberCustomer />
        </div>
    </div>
    </div>
  );
};

export default Customer;
