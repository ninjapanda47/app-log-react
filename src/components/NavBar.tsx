import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";

function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar dark bgColor="dark" expand="lg">
      <MDBContainer className="ms-2">
        <MDBNavbarBrand href="#home" className="float-start">
          Application Tracker
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse id="basic-navbar-nav" navbar show={showBasic}>
          <MDBNavbarNav className="me-auto">
            <Link to="report" className="nav-link">
              Report
            </Link>
            <Link to="application-log" className="nav-link">
              Tracker
            </Link>
            <MDBNavbarItem className="nav-link">Logout</MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
