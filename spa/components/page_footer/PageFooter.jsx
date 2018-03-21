import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { withRouter, routerShape } from 'react-router';

import './PageFooter.scss';
import icon from 'img/Icons/icons8-zubat-48.png';

class PageFooter extends PureComponent {
  render() {
    const { navigations, home } = this.props;
    const navLinks = _.map(navigations, (nav, index) => {
      return (
        <LinkContainer key={index} to={nav.link} title={nav.page}>
          <NavItem eventKey={index + 1}>{nav.page}</NavItem>
        </LinkContainer>
      );
    });
    const { pathname } = this.props.location;

    return (
      <div className="page-footer-component container">
        <Navbar fixedBottom inverse>
          <Navbar.Header>
            <Navbar.Brand className="brand-style">
              <Link to={home}>
                <img
                  src={icon}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="My interactive resume"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight bsStyle="pills" bsClass="nav nav-style" activeHref={pathname}>
              {navLinks}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(PageFooter);
