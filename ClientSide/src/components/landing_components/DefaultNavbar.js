import { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";
// import logoLightBlue from "../../assets/images/logo-light-blue.png";


export default function DefaultNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="transparent" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <a href="/">
            <div  className="xs:invisible md:visible ">
            
            <NavbarBrand >All-Invoice</NavbarBrand>
            </div>
          </a>
          <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="white" />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav>
            <div className="xs:bg-gray-900 lg:bg-transparent rounded-lg flex flex-col z-50 xs:items-end lg:flex-row lg:items-center font-sans">
              {/* <NavLink href="/" ripple="light" >
                <Icon name="description" size="2xl" />
                &nbsp;How it works
              </NavLink> */}
              <NavLink href="/aboutus" ripple="light" >
                <Icon name="person" size="2xl" />
                &nbsp;About us
              </NavLink>
              <NavLink href="/login" ripple="light" >
                <Icon name="login" size="2xl" />
                &nbsp;Log In / Register
              </NavLink>

            </div>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}
