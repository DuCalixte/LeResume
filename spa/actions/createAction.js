import { PENDING } from 'constants/statusTypes';
export default function createAction(type, status = PENDING, payload = {}, meta = null) {
  return {
    type,
    status,
    ...payload,
    meta,
  };
}
