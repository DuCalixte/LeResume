import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';

import BreadcrumbsHeader from 'components/breadcrumbs_header/BreadcrumbsHeader';

export default class BreadcrumbsView extends Component {
  render() {
    return <BreadcrumbsHeader />;
  }
}
