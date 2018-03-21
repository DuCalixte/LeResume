import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  information: profileReducer,
});

export default rootReducer;
