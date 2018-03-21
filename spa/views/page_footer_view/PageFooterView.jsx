import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';

import PageFooter from 'components/page_footer/PageFooter';

export default class PageFooterView extends Component {
  // class PageFooterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigations: [
        {
          page: 'About Me',
          link: '/about',
        },
        {
          page: 'Education',
          link: '/education',
        },
        {
          page: 'Careers',
          link: '/careers',
        },
        {
          page: 'Skills & Expertize',
          link: '/expertize',
        },
        {
          page: 'Hobbies & Interests',
          link: '/interests',
        },
      ],
      home: '/',
    };
  }

  render() {
    return <PageFooter {...this.state} />;
  }
}

// export default withRouter(PageFooterView);
