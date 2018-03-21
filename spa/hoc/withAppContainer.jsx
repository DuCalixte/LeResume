import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const withAppContainer = (Component, id) => {
  const renderBasic = () => {
    ReactDOM.render(<Component />, document.getElementById(id));
  };

  const renderAppContainer = () => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById(id)
    );
  };

  return __PRODUCTION__ ? renderBasic() : renderAppContainer();
};

export default withAppContainer;
