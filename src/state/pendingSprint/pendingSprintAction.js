export const pendingSprintActionTypes = {
  SET_START_DATE: 'SET_START_DATE',
  SET_END_DATE: 'SET_END_DATE',
  SET_AVAILABLE_SPRINT_MEMBERS: 'SET_AVAILABLE_SPRINT_MEMBERS',
};

export const setStartDate = (data) => {
  return {
    data,
    type: 'SET_START_DATE',
  };
};

export const setEndDate = (data) => {
  return {
    data,
    type: 'SET_END_DATE',
  };
};

export const setAvailableMembers = (data) => {
  return {
    data,
    type: 'SET_AVAILABLE_SPRINT_MEMBERS',
  };
};
