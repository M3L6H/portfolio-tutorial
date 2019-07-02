import React from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const BsNavLink = (props) => {
  const { route, title } = props;

  return (
    <NavItem className="port-navbar-item">
      <Link href={ route }>
        <a className="nav-link port-navbar-link">{ title }</a>
      </Link>
    </NavItem>
  );
}

export default class Example extends React.Component {
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
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Michael Hollingworth</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <BsNavLink route="/" title="Home" />
              <BsNavLink route="/about" title="About" />
              <BsNavLink route="/portfolio" title="Portfolio" />
              <BsNavLink route="/blog" title="Blog" />
              <BsNavLink route="/cv" title="CV" />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}