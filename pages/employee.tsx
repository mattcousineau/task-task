import type { NextPage } from "next";
import EnhancedTable from "../components/EmployeeTable";
import { employeeData } from "../utilities/testData";

const Employee: NextPage = () => {
  return (
    <div>
      <EnhancedTable tableData={employeeData} />
    </div>
  );
};

export default Employee;
