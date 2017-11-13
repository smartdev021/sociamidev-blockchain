import { TASKS_SET, FETCH_TASKS_INITIATE, FETCH_TASKS_COMPLETE } from '~/src/redux/actions/actionTypes';

const tasksInitialState = [];

export function tasks(state = tasksInitialState, action) {
  switch (action.type) {
    case TASKS_SET:
      return action.tasks;
    default:
      return state;
    }
}

export function isTasksFetchInProgress(state = false, action) {
  switch (action.type) {
      case FETCH_TASKS_INITIATE:
        return (!state) ? true : state;
      case FETCH_TASKS_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}