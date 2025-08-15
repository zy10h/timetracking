import api, { withAuth } from '../axiosConfig';

export const applyLeave = (token, body) =>
  api.post('/leave/apply', body, withAuth(token));

export const getLeaveHistory = (token) =>
  api.get('/leave/history', withAuth(token));

export const approveLeave = (token, id, action, remark='') =>
  api.put(`/leave/approve/${id}`, { action, remark }, withAuth(token));
