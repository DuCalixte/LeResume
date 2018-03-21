import axios from 'axios';

import { SUCCESS, PENDING, ERROR } from 'constants/statusTypes';
import { LOAD_PROFILE } from 'constants/actionTypes';
import { PROFILE_ENDPOINT } from 'constants/apiEndpoints';

import createAction from './createAction';

export const loadProfile = () => async dispatch => {
  dispatch(createAction(LOAD_PROFILE));

  try {
    let response = await axios.get(PROFILE_ENDPOINT, {});
    dispatch(createAction(LOAD_PROFILE, SUCCESS, { profile: response.data }));
  } catch (error) {
    dispatch(createAction(LOAD_PROFILE, ERROR, { error }));
    throw error;
  }
};
