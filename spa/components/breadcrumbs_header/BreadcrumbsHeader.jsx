import React, { PureComponent } from 'react';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';

import './BreadcrumbsHeader.scss';

class BreadcrumbsHeader extends PureComponent {
  render() {
    const { pathname } = this.props.location;
    const crumbs = {
      home: 'Home',
      about: 'About Me',
      education: 'Education',
      careers: 'Careers',
      expertize: 'Skills & Expertize',
      interests: 'Hobbies & Interests',
    };
    const links = {
      home: '/',
      about: '/about',
      education: '/education',
      careers: '/careers',
      expertize: '/expertize',
      interests: '/interests',
    };
    let crumb_keys = ['home'];
    const concat_keys = _.concat(crumb_keys, _.filter(_.split(pathname, '/')));
    const crumb_components = _.map(concat_keys, (key, index) => {
      return (
        <li className={index === concat_keys.length - 1 ? 'active-page' : ''} key={index}>
          <Link className="animation" title={crumbs[key]} to={links[key]}>
            {crumbs[key]}
          </Link>
        </li>
      );
    });
    return (
      <div className="breadcrumbs-wrapper">
        <ul className="breadcrumbs">{crumb_components}</ul>
        <div className="clear" />
      </div>
    );
  }
}

export default withRouter(BreadcrumbsHeader);
