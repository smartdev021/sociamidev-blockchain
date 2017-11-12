import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    TASKS_SET,

    FETCH_TASKS_INITIATE,
    FETCH_TASKS_COMPLETE,

} from './actionTypes';

export function setTasks(newTasks) {
    return {
        type: TASKS_SET,
        tasks: newTasks
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

export function fetchAllTasks() {
    
    return function (dispatch) {
      
    //async action entry point
    dispatch(fetchTasksInitiate());
    
    const url = `${ConfigMain.getBackendURL()}/tasksGet`;
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