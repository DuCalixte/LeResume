import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CareersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: { name: 'Stanley Calixte IV' },
      statement: null,
      hobbies: null,
    };
  }

  render() {
    const { information } = this.props;
    return <div className="careers-view-container">{this.state.information.name}</div>;
  }
}
