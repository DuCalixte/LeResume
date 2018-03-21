import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AboutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: { name: 'Stanley Calixte II' },
      statement: null,
      hobbies: null,
    };
  }

  render() {
    const { information } = this.props;
    return <div className="about-view-container">{this.state.information.name}</div>;
  }
}
