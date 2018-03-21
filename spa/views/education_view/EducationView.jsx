import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EducationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: { name: 'Stanley Calixte III' },
      statement: null,
      hobbies: null,
    };
  }

  render() {
    const { information } = this.props;
    return <div className="education-view-container">{this.state.information.name}</div>;
  }
}
