export const UPDATE_STATUS = "UPDATE_STATUS";
export const DEADLINE_REACHED = "DEADLINE_REACHED";

export const updateStatus = (status) => ({
  type: UPDATE_STATUS,
  payload: status,
});

export const deadlineReached = () => ({
  type: DEADLINE_REACHED,
});
