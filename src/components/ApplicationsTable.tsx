import Table from "react-bootstrap/Table";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import { AppInfo } from "../reducers/applicationSlice";
import dayjs from "dayjs";

const getColor = (status: string) => {
  if (status === "Applied") {
    return "secondary";
  } else if (status === "In Process") {
    return "primary";
  } else if (status === "Received Offer") {
    return "success";
  } else {
    return "danger";
  }
};

// this should stay a functional component since it's just displaying the data
export default function ApplicationsTable(props: { applications: AppInfo[] }) {
  const rows = props.applications.map((app) => (
    <tr key={app._id}>
      <td width="150px">{app.companyName}</td>
      <td width="200px">{app.jobTitle}</td>
      <td width="300px">
        <div className="truncate-ellipsis">
          <a href={app.jobUrl} target="_blank">
            {app.jobUrl}
          </a>
        </div>
      </td>
      <td width="150px">{dayjs(app.dateApplied).format("MM-DD-YYYY")}</td>
      <td width="150px">
        <MDBBadge color={getColor(app.status)} pill>
          {app.status}
        </MDBBadge>
      </td>
    </tr>
  ));
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol>
          {" "}
          <MDBTable striped bordered hover>
            <MDBTableHead>
              <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Job Link</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>{rows}</MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
