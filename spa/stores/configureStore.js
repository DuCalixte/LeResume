import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { default as rootReducer } from 'reducers/rootReducer';
import initialState from 'stores/states/initialState';

const configureStore = () => {
  const history = createHistory();
  const middlewares = [thunk, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers =
    (/^production$/.test(process.env.NODE_ENV) && compose) ||
    ((window !== undefined && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose);
  const store = createStore(rootReducer, ...initialState, composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('reducers/rootReducer', () => {
      const nextReducers = require('reducers/rootReducer');
      store.replaceReducer(nextReducers);
    });
  }
  return store;
};

export default configureStore;
