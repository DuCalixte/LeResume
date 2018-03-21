import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageHeader from 'components/page_header/PageHeader';

import { loadProfile } from 'actions/profileActions';

class PageHeaderView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.information.loaded) return;
    this.props.loadProfile();
  }

  render() {
    return <PageHeader {...this.props.information.profile} />;
  }
}

export default connect(({ information }) => ({ information }), { loadProfile })(PageHeaderView);
