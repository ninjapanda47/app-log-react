import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
import * as userService from "../services/userService";
import { setToken } from "../utils/fetchUtils";
import { Navigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { UserInfo, set, unset } from "../reducers/userSlice";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

interface RootState {
  user: {
    user: UserInfo;
    isAuthenticated: boolean;
  };
}

const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = {
  set: (user: UserInfo) => set(user),
  unset: () => unset,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type State = {
  username: string;
  password: string;
};

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ username: e.currentTarget.value });
  };

  onPasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ password: e.currentTarget.value });
  };

  async handleSubmit(event: any) {
    event.preventDefault();
    const response = await userService.userLogin(
      this.state.username,
      this.state.password
    );
    if (!response.error) {
      await setToken(response.id_token);
      this.props.set(response.user);
    }
  }

  render() {
    let isAuthenticated = this.props.user.isAuthenticated;
    return (
      <div>
        {isAuthenticated && <Navigate to="/dashboard" replace={true} />}
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-5">
              <MDBCard style={{ width: "18rem" }} className="mx-auto">
                <MDBCardBody>
                  <MDBCardTitle>Login</MDBCardTitle>
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <MDBInput
                        className="mb-4"
                        type="text"
                        id="username"
                        label="Username"
                        value={this.state.username}
                        onChange={(event) =>
                          this.onUsernameChange(event as any)
                        }
                      />
                      <MDBInput
                        className="mb-4"
                        type="password"
                        id="password"
                        label="Password"
                        value={this.state.password}
                        onChange={(event) =>
                          this.onPasswordChange(event as any)
                        }
                      />
                      <MDBBtn className="mx-auto" color="primary" type="submit">
                        Submit
                      </MDBBtn>
                    </form>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default connector(LoginPage);
