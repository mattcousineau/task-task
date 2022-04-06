import type { NextPage } from "next";
import OrdersTable from "../components/OrdersTable";
import { supplyOrderData } from "../utilities/testData";

const Orders: NextPage = () => {
  return (
    <div>
      <OrdersTable tableData={supplyOrderData} />
    </div>
  );
};

export default Orders;
