import type { NextPage } from "next";
import CustomTable from "../components/CustomTable";
import { employeeData } from "../utilities/testData";

const Employee: NextPage = () => {
  return (
    <div>
      <CustomTable tableType="employee" tableData={employeeData} />
    </div>
  );
};

export default Employee;
