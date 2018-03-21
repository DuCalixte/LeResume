import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { withRouter, routerShape } from 'react-router';

// import HeaderPage from 'components/header_page/HeaderPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        // <HeaderPage information="Stanley Calixte" />
        {children && React.cloneElement(children)}
      </div>
    );
  }
}

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.node,
  // router: routerShape.isRequired,
};

export default withRouter(App);
