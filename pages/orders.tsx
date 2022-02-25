import type { NextPage } from "next";
import CustomTable from "../components/CustomTable";

const Orders: NextPage = () => {
  const supplyOrderData = [
    {
      name: "Jeff Klein",
      order: "101",
      location: "West Building",
      created: "02/12/2022",
      desiredDate: "01/28/2022",
      status: "OPEN",
    },
    {
      name: "Bill Jones",
      order: "102",
      location: "East Building",
      created: "04/12/2022",
      desiredDate: "04/28/2022",
      status: "CLOSED",
    },
  ];

  return (
    <div>
      <CustomTable tableType="supplyOrder" tableData={supplyOrderData} />
    </div>
  );
};

export default Orders;
