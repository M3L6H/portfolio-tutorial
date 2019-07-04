import Link from "next/link";
import React from "react";
import auth0 from "../../services/auth0";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const LoginBtn = () => {
  return (
    <span className="nav-link port-navbar-link clickable" onClick={ auth0.login }>
      Login
    </span>
  );
}

const LogoutBtn = () => {
  return (
    <span className="nav-link port-navbar-link clickable" onClick={ auth0.logout }>
      Logout
    </span>
  );
}

const BsNavLink = (props) => {
  const { route, title } = props;

  return (
    <Link href={ route }>
      <a className="nav-link port-navbar-link">{ title }</a>
    </Link>
  );
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated, className } = this.props;

    return (
      <div>
        <Navbar className={ `port-navbar port-nav-base absolute ${ className }` } color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Michael Hollingworth</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolio" title="Portfolio" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blog" title="Blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" title="CV" />
              </NavItem>
              { !isAuthenticated &&
                <NavItem className="port-navbar-item">
                  <LoginBtn />
                </NavItem>
              }
              { isAuthenticated &&
                <NavItem className="port-navbar-item">
                  <LogoutBtn />
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}