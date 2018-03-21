import React from 'react';
import ReactDOM from 'react-dom';

import Routes from 'components/Routes';
import withAppContainer from 'hoc/withAppContainer';

import 'styles/theme.scss';

withAppContainer(Routes, 'main');

if (module.hot) {
  module.hot.accept('components/Routes', () => {
    withAppContainer(Routes, 'main');
  });
}
