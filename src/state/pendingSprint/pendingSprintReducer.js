import { pendingSprintActionTypes } from './pendingSprintAction';
import { createReducer } from '../helpers';


const initialState = {
  startDate: null,
  endDate: null,
  availableMembers: [],
};


const setStartDate = (state, action) => {
  const newState = state;
  newState.startDate = action.data;
  return newState;
};

const setEndDate = (state, action) => {
  const newState = state;
  newState.endDate = action.data;
  return newState;
};

const setAvailableMembers = (state, action) => {
  const newState = state;
  newState.availableMembers = action.data;
  return newState;
};

export default createReducer(initialState, {
  [pendingSprintActionTypes.SET_START_DATE]: setStartDate,
  [pendingSprintActionTypes.SET_END_DATE]: setEndDate,
  [pendingSprintActionTypes.SET_AVAILABLE_SPRINT_MEMBERS]: setAvailableMembers,
});
