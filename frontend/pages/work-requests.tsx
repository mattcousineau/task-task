import type { NextPage } from "next";
import WorkRequestTable from "../components/WorkRequestTable";
import { requestData } from "../utilities/testData";

const WorkRequests: NextPage = () => {
  return (
    <div>
      <WorkRequestTable tableData={requestData} />
    </div>
  );
};

export default WorkRequests;
