import type { NextPage } from "next";
import EmployeeTable from "../components/EmployeeTable";
import EnhancedTable from "../components/EmployeeTable";
import { employeeData } from "../utilities/testData";

const Employee: NextPage = () => {
  return (
    <div>
      <EmployeeTable tableData={employeeData} />
    </div>
  );
};

export default Employee;
