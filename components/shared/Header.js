import Link from "next/link";
import ActiveLink from "../ActiveLink";
import React from "react";
import auth0 from "../../services/auth0";
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
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
  const className = props.className || "";

  return (
    <ActiveLink activeClassName="active" route={ route }>
      <a className={ `nav-link port-navbar-link ${ className }` }>{ title }</a>
    </ActiveLink>
  );
}

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderBlogMenu() {
    const { isSiteOwner } = this.props;

    if (isSiteOwner)
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={ this.state.dropdownOpen } toggle={ this.toggleDropdown }>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs"
                title="Blog"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs/new"
                title="Create Blog Post"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs/dashboard"
                title="Blog Dashboard"
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog" />
      </NavItem>
    );
  }

  render() {
    const { isAuthenticated, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? "menu-open" : "menu-close";

    return (
      <div>
        <Navbar className={ `port-navbar port-nav-base absolute ${ className }  ${ menuOpenClass }` } color="transparent" dark expand="md">
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
                { this.renderBlogMenu() }
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