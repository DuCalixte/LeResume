import React, { PureComponent } from 'react';
import _ from 'lodash';

import './TextWobble.scss';

export default class TextWobble extends PureComponent {
  render() {
    const { title } = this.props;
    const output = _.map(_.split(title, ''), (char, index) => {
      const klass = char === ' ' ? 'empty' : 'wobbly';
      return (
        <span key={index} className={klass}>
          {char}
        </span>
      );
    });

    return (
      <div className="wobbly-text">
        <h2>{output}</h2>
      </div>
    );
  }
}
