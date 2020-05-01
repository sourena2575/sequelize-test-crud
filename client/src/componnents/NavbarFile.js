import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import SignupFile from "./auth/SignupFile";
import LoginFile from "./auth/LogInFile";

const NavbarFile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand href="/">خانه</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {localStorage.getItem("userEmail") ? (
                <>
                  <NavItem>
                    <NavLink>{localStorage.getItem("userEmail")}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        localStorage.removeItem("userEmail");
                        window.location = "/";
                      }}
                    >
                      خروج
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <LoginFile />
                  </NavItem>
                  <NavItem>
                    <SignupFile />
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarFile;
