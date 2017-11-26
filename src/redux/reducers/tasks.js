import { 
  TASKS_SET,
  TASK_LASTSAVED_SET,
  FETCH_TASKS_INITIATE, 
  FETCH_TASKS_COMPLETE, 
  SAVE_TASK_INITIATE, 
  SAVE_TASK_COMPLETE,
  TASK_UPDATE, 
  TASK_ADD,
  TASK_REMOVE,
  UPDATE_TASK_INITIATE,
  UPDATE_TASK_COMPLETE,

} from '~/src/redux/actions/actionTypes';

const tasksInitialState = [];

export function tasks(state = tasksInitialState, action) {
  switch (action.type) {
    case TASKS_SET:
      return action.tasks;
    case TASK_UPDATE: {
      let findByID = function(task) {
        return task._id == action.id;
      }

      const foundIndex = state.findIndex(findByID);

      if (foundIndex != -1) {
        let copyTasks = state.slice(0);

        copyTasks[foundIndex] = action.task;

        return copyTasks;
      }

      return state;
    }
    case TASK_ADD: {
      let copyTasks = state.slice(0);
      
      copyTasks.push(action.task);

      return copyTasks;
    }
    case TASK_REMOVE: {
      let findByID = function(task) {
        return task._id == action.id;
      }

      const foundIndex = state.findIndex(findByID);

      if (foundIndex != -1) {
        let copyTasks = state.slice(0);

        copyTasks.splice(foundIndex, 1);

        return copyTasks;
      }

      return state;
    }
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

export function isTasksUpdateInProgress(state = false, action) {
  switch (action.type) {
      case UPDATE_TASK_INITIATE:
        return (!state) ? true : state;
      case UPDATE_TASK_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}

export function isTaskSaveInProgress(state = false, action) {
  switch (action.type) {
      case SAVE_TASK_INITIATE:
        return (!state) ? true : state;
      case SAVE_TASK_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}

export function lastSavedTask(state = {}, action) {
  if (action.type == TASK_LASTSAVED_SET) {
    return action.task;
  }
  else {
    return state;
  }
}