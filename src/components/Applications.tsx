import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppInfo, fetchApplications } from "../reducers/applicationSlice";
import { UserInfo } from "../reducers/userSlice";
import ApplicationsTable from "./ApplicationsTable";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

interface RootState {
  application: {
    applications: AppInfo[];
  };
  user: {
    user: UserInfo;
  };
}

const mapState = (state: RootState) => ({
  application: state.application,
  user: state.user,
});

const mapDispatch = {
  fetchApplications: (userId: string) => fetchApplications(userId),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = {};

// This needs to be a class component cause I need to add delete applications
class Applications extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.fetchApplications(this.props.user.user?._id);
  }

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow className="mt-4">
          <MDBCol>
            <MDBBtn className="float-start ms-4" color="danger">
              Delete
            </MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn className="float-end me-4" color="success">
              Add
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol>
            <ApplicationsTable
              applications={this.props.application.applications}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default connector(Applications);
