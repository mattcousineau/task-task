import type { NextPage } from "next";
import CustomTable from "../components/CustomTable";
import { supplyOrderData } from "../utilities/testData";

const Orders: NextPage = () => {
  return (
    <div>
      <CustomTable tableType="supplyOrder" tableData={supplyOrderData} />
    </div>
  );
};

export default Orders;
