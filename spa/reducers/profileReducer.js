import { SUCCESS, PENDING, ERROR } from 'constants/statusTypes';
import { LOAD_PROFILE } from 'constants/actionTypes';

import initialState from 'stores/states/initialState';
const { profileState } = initialState;

const profileReducer = (state = profileState, action) => {
  if (action.type !== LOAD_PROFILE) {
    return state;
  }

  switch (action.status) {
    case SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        loaded: true,
        profile: action.profile,
        error: null,
      });
    case PENDING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default profileReducer;
