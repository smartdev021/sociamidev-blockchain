import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    TASKS_SET,
    TASKS_UPDATE,
    TASK_ADD,

    FETCH_TASKS_INITIATE,
    FETCH_TASKS_COMPLETE,

    SAVE_TASK_INITIATE,
    SAVE_TASK_COMPLETE,
    TASK_SET_PUBLISHED,

} from './actionTypes';

export function setTasks(newTasks) {
    return {
        type: TASKS_SET,
        tasks: newTasks
    }
}

export function addTask(newTask) {
    return {
        type: TASK_ADD,
        task: newTask
    }
}

export function updateTask(taskId, newTask) {
    return {
        type: TASK_UPDATE,
        id: taskId,
        task: newTask,
    }
}

export function fetchTasksInitiate() {
    return {
        type: FETCH_TASKS_INITIATE,
    }
}

export function fetchTasksComplete() {
    return {
        type: FETCH_TASKS_COMPLETE,
    }
}

export function saveTaskInitiate() {
    return {
        type: SAVE_TASK_INITIATE,
    }
}

export function saveTaskComplete() {
    return {
        type: SAVE_TASK_COMPLETE,
    }
}

export function setTaskPublished(taskId, published) {
    return function (dispatch) {
        
      //async action entry point
      dispatch(saveTaskInitiate());
      
      const url = `${ConfigMain.getBackendURL()}/taskSetPublished?id=${taskId}&isHidden=${published}`;
        return (
        Axios.get(url)
        .then(function(response) {
            dispatch(updateTask(response.data._id, response.data));
            dispatch(saveTaskComplete());
        })
        .catch(function(error) {
            dispatch(saveTaskComplete({}));
        }));
    }
}

export function saveTask(task) {
    return function (dispatch) {
        
      //async action entry point
      dispatch(saveTaskInitiate());
      
      const url = `${ConfigMain.getBackendURL()}/taskSavePost`;
        return (
        Axios.post(url, task)
        .then(function(response) {
            dispatch(addTask(response.data));
            dispatch(saveTaskComplete());
        })
        .catch(function(error) {
            dispatch(saveTaskComplete({}));
        }));
    }
}

export function fetchAllTasks(publishedOnly) {
    
    return function (dispatch) {
      
    //async action entry point
    dispatch(fetchTasksInitiate());
    
    const url = `${ConfigMain.getBackendURL()}/tasksGet?publishedOnly=${publishedOnly}`;
          return (
            Axios.get(url)
            .then(function(response) {
                //async action exit point
                dispatch(setTasks(response.data));
                dispatch(fetchTasksComplete());
            })
            .catch(function(error) {
                //async action exit point
                dispatch(setTasks({}));
                dispatch(fetchTasksComplete({}));
            }));
        }
    }