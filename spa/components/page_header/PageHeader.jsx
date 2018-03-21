import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TextWobble from 'components/text_wobble/TextWobble';
import './PageHeader.scss';

export default class PageHeader extends Component {
  composeText() {
    const { information } = this.props;
    return <div className="wrobly-text-container">{information}</div>;
  }
  render() {
    const { title, summary } = this.props;
    return (
      <div className="page-header-component">
        <TextWobble className="header-Text" title={title} />
        <small className="header-subtext">{summary}</small>
      </div>
    );
  }
}
